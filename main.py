from download import *
from notification import *
from bottle import *
import threading

urls = []
class Download(threading.Thread):
    def __init__(self):
        super().__init__()
        self.running = True

    def run(self):
        while self.running:
            if urls:
                url, name, category, domain = urls.pop()
                print(category, name)
                notif("{} {}:at {}".format(category, name, len(urls)), title=domain, subtitle=url)
                download(url, category, name)

                if not urls:
                    notif("empty!!", title="pydown")

@post("/")
def index():
    response.headers["Access-Control-Allow-Origin"] = "*"
    urls.append((request.forms.url, request.forms.name, request.forms.category, request.forms.domain))
    return "ok"

downloader = Download()
downloader.start()
try:
    run(host="0.0.0.0", port=8000, reloader=True)
except KeyboardInterrupt:
    pass
downloader.running = False
