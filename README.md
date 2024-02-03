# Loop Station

For this project, we decided to build a Loop Station. This is a machine that let's us record and play back multiple
simultaneous loops, whilst adding effects on top. We decided to tackle this specific machine because it let us explore
multiple different facets of audio manipulation, from the recording and synchronisation of multiple concurrent loops, to the
internal routing of the audio stream through a flexible and user-modifiable sequence of effects. Lastly, we are also fans of
this design and wanted to learn the inner workings of such a machine.

## Link to the project

The project can be found at [this link](https://laughinginloud.github.io/ACTAM-2023-LoopStation/).

## Presentation video

https://github.com/laughinginloud/ACTAM-2023-LoopStation/assets/33002186/6ce22c56-7021-4c5b-84c7-1f5241cf8c62

## Structure

Regarding the internal structure of the project, we decided to adopt a subdivision
based on the MVC pattern. This is divided in:
- model, which is the main database of the application,
- controller, which governs the logic and general state of the application,
- view, which interfaces the user interface with the rest of the application.

We decided to follow this structure pretty stricly, although these restriction were loosened up
in a few places to fully leaverage the dynamic nature of JavaScript.

To aid in this task, we decided to use the full object-oriented capabilities of the language, encapsulating
all the necessary to make a component work in its class and dividing these logically in a three main modules, one
for each component of the MVC pattern. This allowed us to more easily adapt the code whenever necessary, for
example to overcome unforseen challenges and to incrementally add effects.

There are also a couple of files who do not fall squarely in this pattern, and instead aimed at general utilities.
Specifically, there is a `main.js` file, which serves as the main entry point of the app, and a `gui.js` file, which
initialises all that concernes the basic structure and interactivity of the gui.

Finally, since this is a web application, there exists and `index.html` file with an associated `loopStation.css`,
which contain the general strucure and presentation of said user interface.

## Implementation details

### JavaScript

The main language used for this project is JavaScript, a dynamic, high-level language used to program web pages.
We based the main core of our project on its *Web Audio API*, an interface geared towards the creation and manipulation
of audio streams.

Since the heart of our project is a loop machine, we used a `MediaRecorder` to save the
information gathered from a connected microphone, which will be selected using the browser, in a blob, which is then
converted to an `AudioBuffer` and finally played in loop by an `AudioBufferSource`.

### Tone.js

We used the power of this library to implement the audio effects, creating small wrappers around them and connecting
them to the main `AudioContext` via the provided methods.

### GSAP

This library was used to more easily create the knobs of the user interface.

### Node.js

Node.js was used to more easily develop the code, allowing the two aforementioned libraries to be saved locally on
our computers and providing us with the possibility of using Parcel.

### Parcel

This tool was used to bundle all the code and dependencies in a smaller footprint, to easily pack and upload to the
public web page, and to create a local server for us to work on, emulating the final result of the upload.

## Main challenges

A few big challenges were encountered during development.

First of all, we needed to correctly implement the view and all its components, since it is a very complex part of
the code, needing to correctly parse all user inputs and react accordingly, all whilst maintaining a coherent internal
state. To solve it, we used an agile approach, first designing the solution and then implementing it and iteratively
adding the corner cases we missed.

Another hurdle concerned the implementation of the overdub feature. Since it is not a common task in the API, we had
to design an algorithm to correctly fuse the original loop with the dub. To do so, we decided to act on the buffer
themselves, which allowed an easier implementaion.

Integrating Tone.js was a bit trickier than we expected, since we mostly used the standard API and turned to this
library only when we needed specific pieces. We therefore decided to create some small wrappers around the classes
provided by this library and to implement some utility methods to unwrap them and corretly connect them to the
right audio context.

Latency was a problem we immeditely recognised and tried to mitigate. Whilst there is still a little latency with
some operations, we minimised it by carefully selecting all the components we found to be the least problematic.
We acted on this immediately, before starting to code the logic we had prepared, so as to avoid the need to
rethink the main algorithms of our project.

Finally, whilst our use of modules and classes helped us during development, by encapsulating what was needed
in easily extendable blocks, it turned out to be problematic regarding some security issues. Thanks to Node.js and
Parcel we quickly solved it by creating a local server for us to work on whenever we needed.
