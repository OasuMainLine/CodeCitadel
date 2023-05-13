---
slug: youtube-downloader-tutorial
title: Let's make a Youtube video downloader with Python and Pytube
date: 2023-5-3
summary: Python allows us to quickly set up all kind of apps. In this occasion, we'll see how to create a desktop application for youtube video downloading using the pytube library.
# 0 = WEB, 1 = BACKEND, 2 = OTHER
categories: [["Desktop App", 1], ["Python", 1]]
---

[pytube api]: https://pytube.io/en/latest/api.html

## Introduction

Those who have been around the python community for a while know just how wide is the ecosystem, there are packages for almost everything, and that is what makes python so convenient. One of them is the `pytube` package, which allows us to easily download audio or video streams for youtube. It's fairly simple to implement and use, today we will be building a simple GUI interface for pytube using the `PySimpleGUI` library.

## Setup

Usually, when working with python we like to have isolated environments as to not fill the whole system with a bunch of packages. We can achieve this using the `venv` command like so:

```bash
//filename:terminal
python -m venv /path/to/new/virtual/environment
```

Know go ahead and install all the dependencies we need, in this case, it would be:

```bash
//filename:terminal
pip install pytube PySimpleGUI
```

Now we are all set to create our GUI.

## The Interface

For this simple demo, we need these features:

1. An URL field for our video url.
2. Download Folder.
3. Option to download between audio and video.

Let's work around the first one. First, we need to import the PySimpleGui object (I am assigning it an alias so its easier to write) and then create our layout, after adding our event loop the result should be the following:

```python
//filename: main.py
import PySimpleGUI as sg

URL_INPUT_KEY = "--url"
LAYOUT = [
    [sg.Text("URL:"), sg.In("", key=URL_INPUT_KEY)],
]

window = sg.Window(title="PyTube Downloader", layout=LAYOUT, margins=(100, 100))
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED:
        break
```

If you are not used to PySimpleGUI, it allows us to compose our layout in a really straighforward manner, basically, the window is built by rows and colums, each subarray represents a row, and each item a column, here, we have just one row for two items, a label with the text "URL:" and the actual input, we also assign a key to this input in order to access the event later on. After that, we declare our main window, with a title, the layout, and some margins, then run this window in a loop that can only be stopped when pressing the exit button.

after executing `py main.py` we should see something like this:

![Our first window || This is our layout](/images/posts/PyTube/our_window.png "Our first window")

But well, there are not many things that can be achieved with only this, let's make this layout a little bit more complex:

```python
//filename:main.py
import PySimpleGUI as sg
import os

URL_INPUT_KEY = "--url"
FOLDER_INPUT_KEY = "--folder"
VIDEO_BTN_KEY ="--video"
AUDIO_BTN_KEY = "--audio"

DEFAULT_FOLDER = os.path.join(os.getcwd(), "downloads")

LAYOUT = [
    [sg.Text("Carpeta de guardado:")],
    [sg.In(DEFAULT_FOLDER, enable_events=True, key=FOLDER_INPUT_KEY), sg.FolderBrowse()],
    [sg.Text("URL:"), sg.In("", key=URL_INPUT_KEY)],
    [sg.Button("Video", key=VIDEO_BTN_KEY), sg.VSeparator(), sg.Button("Audio", key=AUDIO_BTN_KEY)],
]

window = sg.Window(title="PyTube Downloader", layout=LAYOUT, margins=(100, 100))
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED:
        break
```

As you can see, we can expand our layout easily, here we just added the label and input for the folder and two buttons, one for video and the other for audio respectively, each one with a key. There is also a default folder, where the videos are gonna be stored, by default they're going to be stored in a folder called `downloads` in the same location as our main file.

![This is our current layout || This is all for the layout](/images/posts/PyTube/ourwindow2.png "This is our new layout")

## The functionality

Now that we have a nice layout, let's make it functional.

```python
//filename:main.py

import PySimpleGUI as sg
import os
from pytube import YouTube

...constants

LAYOUT = [...]
window = sg.Window(title="PyTube Downloader", layout=LAYOUT, margins=(100, 100))

def download(url, target_dir):
    yt = YouTube(url)
    streams = yt.streams.filter(file_extension="mp4", progressive=True).order_by("resolution").desc()
    streams.first().download(output_path=target_dir)

while True:
    event, values = window.read()

    if event == VIDEO_BTN_KEY:
        url, target_dir = window[URL_INPUT_KEY].get(), window[FOLDER_INPUT_KEY].get()

        download(url, target_dir)
    if event == sg.WIN_CLOSED:
        break
```

Here, we are doing the following:

- Defining a `download` function that takes two arguments, the url and the target directory.
  - Inside here we create an instance of the `Youtube` class from the pytube library.
  - The constructor takes the url of the youtube video, it can also have some configuration parameters, if you're interested you can check out the [Pytube API].
  - Then, we access the stream property, which basically are all the available video formats.
  - We filter those streams, because we only care for those who have the mp4 extension, and are **progressive**
    - Progressive videos are those that have both audio and video, this step is important since youtube uses the DASH streaming technique in some videos to deliver a better experience, the downside for us is that DASH streams only come with the video.
  - After the filtering is done, we order the streams by resolution and then in descendent order since we want the better ones at the top.
  - finally, we take the first stream of the list and download it to our target directory.
- In our loop we then at an if statement that will act as a listener for our video button, inside we take the url and directory values from the window and execute our donwload function.

If you go ahead and try it out you will see how the video gets downloaded. The only step left is to implement the only-audio option, which shouldn't be a problem.

Let's add an extra argument to our `download` function

```python
def download(url, target_dir, audio_only=False):
    yt = YouTube(url)
    streams = None
    if(audio_only):
        streams = yt.streams.filter(audio_only=True)
    else:
        streams = yt.streams.filter(file_extension="mp4", progressive=True).order_by("resolution").desc()
    streams.first().download(output_path=target_dir)
```

Here we are adding an optional argument called `audio_only`, if enabled, we only search for the audio streams inside the video.

And then in our event loop:

```python
while True:
    event, values = window.read()

    if event == VIDEO_BTN_KEY:
        url, target_dir = window[URL_INPUT_KEY].get(), window[FOLDER_INPUT_KEY].get()
        download(url, target_dir)
    if event == AUDIO_BTN_KEY:
        url, target_dir = window[URL_INPUT_KEY].get(), window[FOLDER_INPUT_KEY].get()
        download(url, target_dir, True)
    if event == sg.WIN_CLOSED:
        break
```

And that's about it! You can go ahead and add more functionalities, like a progress bar for the videos, a regex that checks if both the url and directory are correct, a filename field, etc.

## Troubleshooting

If you had a `KeyError: 'streamingData'` when downloading the video, that could mean that the pytube library is not up-to-date, you can fix it by donwloading it right from the git repository, like so:

```bash
//filename: terminal
python -m pip install git+https://github.com/nficano/pytube
```

## Conclusions

We learned how to use the pytube library along the PySimpleGUI to create a quick and functional youtube video downloader, I hope you found this article helpful, see you in the next one!

## Related links

- Pytube: https://pytube.io/en/latest/index.html
- PySimpleGUI: https://www.pysimplegui.org/en/latest/
