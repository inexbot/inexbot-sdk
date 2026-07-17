---
title: Teach Pendant
description: Nabot Teach Pendant (T30) secondary development guide, based on Qt static library, supporting Windows, Linux, ARM-Linux multi-platform.
---

# Teach Pendant

## Introduction

Teach Pendant secondary development is based on the interfaces provided by the static library of the teach pendant software.

The secondary development static library supports development on three system platforms: Windows, Linux, and ARM-Linux (T30 Teach Pendant):

Windows-based development can be used to create host computer programs;

Programs developed using the Linux-based secondary development static library can be used for debugging or to generate host computer software for Linux systems;

Programs generated using the ARM-Linux (T30) version of the secondary development static library are only supported for running on the company's T30 Teach Pendant.

It provides complete basic teach pendant functionality, allowing users to customize the required process interfaces, provide user-defined custom instructions, insert custom interfaces, and offer a universal data transceiver interface (communication data format is unified as JSON format).

## Learning Path

Before learning Teach Pendant secondary development, we assume you already possess the following knowledge:

- C++ language;
- Qt usage;
- Linux system (Ubuntu distribution) usage;
- Basic knowledge of industrial robots;
- QtCreator editor.

If you do not have the above knowledge, we recommend the following tutorials:

- C++ Tutorial - Qt Tutorial
- Ubuntu Complete Tutorial, Make You an Ubuntu Expert!
- Linux Ubuntu Basic Operation Commands
- Nabot Classroom
- Nabot Control System Operation Manual
