from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import Http404, HttpResponseForbidden, JsonResponse
from .models import Note
from .serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@api_view(['GET', 'POST', 'DELETE'])
def api_note(request, note_id):
    try:
        note = Note.objects.get(id=note_id)
    except Note.DoesNotExist:
        raise Http404()
    
    if request.method == 'POST':
        new_note_data = request.data
        cidade = new_note_data['cidade']
        note.save()
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=204)

    serialized_note = NoteSerializer(note)
    return Response(serialized_note.data)

@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def api_notes(request):
    print(request)
    if request.method == "POST":
        new_note_data = request.data
        cidade = new_note_data['cidade']
        user = request.user
        note = Note(cidade=cidade, user=user)
        note.save()

    notes = Note.objects.filter(user=request.user)

    serialized_note = NoteSerializer(notes, many=True)
    return Response(serialized_note.data)

@api_view(['POST'])
def api_get_token(request):
    try:
        if request.method == 'POST':
            username = request.data['username']
            password = request.data['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return JsonResponse({"token":token.key})
            else:
                return HttpResponseForbidden()
    except:
        return HttpResponseForbidden()

@api_view(['POST'])
def api_user(request):
    if request.method == 'POST':
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']

        user = User.objects.create_user(username, email, password)
        user.save()
        return Response(status=204)