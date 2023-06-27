from django.http import HttpResponse
import os
import openai
import environ

def index(request):
    '''
    query the dalle api
    query the chatgptapi
    use image library to overlay gpt text onto dalle image
    generate html to return
    respond with html
    '''

    # env = environ.Env()
    # environ.Env.read_env()

    openai.api_key = os.getenv('OPENAI_API_KEY')

    PROMPT = "An eco-friendly computer from the 90s in the style of vaporwave"

    response = openai.Image.create(
        prompt=PROMPT,
        n=1,
        size="256x256",
    )


    print('yo we here bros')
    print(response["data"][0]["url"])

    return HttpResponse("Hello, world. You're at the polls index.")

def cheese_index(request):
    return HttpResponse("I like cheese.")