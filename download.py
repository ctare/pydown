from subprocess import run
from notification import *
import youtube_dl


def download(url, category, title):
    try:
        with youtube_dl.YoutubeDL({
            "format": "bestaudio/best",
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
                }],
            "outtmpl": "result/{}/{}.%(ext)s".format(category, title)
            }) as dl:

            dl.download([url])
    except:
        with open("log", "a") as f:
            f.write(url + "\n")
