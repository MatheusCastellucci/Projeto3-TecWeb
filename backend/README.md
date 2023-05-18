# 08 Handout - Django REST

Código resultante do handout 08 - Django REST disponível em: https://barbaratieko.github.io/tecweb.2023.1/aulas/08-django-rest/

Para utilizar este projeto siga os passos a seguir:

- Crie um ambiente virtual para este projeto:

      python -m venv env

- Ative o ambiente virtual:

    - Windows PowerShell

          env\Scripts\Activate.ps1

    - Linux/MacOS

          source env/bin/activate

- No projeto existe um arquivo requirements.txt que possui todas as dependências necessárias. Para instalá-las basta utilizar o comando:

      pip install -r requirements.txt

- Vamos criar as tabelas do banco de dados:

      python manage.py migrate

- Pronto! Agora execute o servidor.

      python manage.py runserver

O projeto possui as seguintes funcionalidades implementadas:

| Metodo | URI           | Funcionalidade                              |
|--------|---------------|---------------------------------------------|
| GET    | /api/notes/id | Recuperar os dados de uma determinada nota. |
| POST   | /api/notes/id | Atualizar os dados de uma determinada nota  |
| DELETE | /api/notes/id | Delete uma determinada nota.                |
| GET    | /api/notes    | Recuperar os dados de todas as notas.       |
| POST   | /api/notes    | Criar uma nova nota.                        |
