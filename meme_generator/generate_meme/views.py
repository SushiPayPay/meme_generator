from django.http import HttpResponse
import os
import openai
import environ
import requests
import heapq
from utils import MemeFileManager

meme_file_manager = MemeFileManager()

def index(request):
    '''
    query the dalle api
    query the chatgptapi
    use image library to overlay gpt text onto dalle image
    generate html to return
    respond with html
    '''

    openai.api_key = os.getenv('OPENAI_API_KEY')

    PROMPT = "An eco-friendly computer from the 90s in the style of vaporwave"

    response = openai.Image.create(
        prompt=PROMPT,
        n=1,
        size="256x256",
    )

    url = response["data"][0]["url"]

    meme_file_manager.download_meme(url)

    return HttpResponse("Hello, world. You're at the polls index.")

def cheese_index(request):
    return HttpResponse("I like cheese.")


# const std::string base_prompt =
# R"(you are an edgy AI powered image macro generator.
# you are given a meme prompt,
# and in response you need to generate a top_text and bottom_text as a JSON object.
# captions should be about 5 words each.
# you should use the prompt to generate puns, employ ironic humor, and generally be witty in your response
# Be concise. Return only the JSON object.
# Prompt: )";

# !openai_interface_->gen_image_and_download(req_body +  ", lineart, monochrome", image_path)