import subprocess
def notif(message, title="py通知", subtitle=None):
    subprocess.run(["osascript", "-e", 'display notification "{}" with title "{}" {}'.format(message, title, "" if subtitle is None else 'subtitle "{}"'.format(subtitle))])
