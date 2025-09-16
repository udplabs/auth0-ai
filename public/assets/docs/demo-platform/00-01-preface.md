### FGA, RAG, & CIBA... oh my!

This guide attempts to mirror the Google codelab style: short steps, runnable code, and clear outcomes.

You’ll build a demo app for ***the bAInk*** using Next.js (App Router) that showcases **Auth0 Auth for AI Agents** as well as **Auth0 FGA** (fine‑grained authorization) powering **RAG** and **securing AI tools**. Your companion AI assistant **Aiya** will be available inside the app (once you get it spun up) to help you out.

### Just a few things...

- This lab uses a combination of the Okta Demo Platform and a self-guided learning application. Feel free to switch between the two but keep in mind the content _may_ vary slightly. When in doubt, the Demo Platform is [most likely] the more accurate source of truth.

- Throughout the lab you will see types of alerts/panels like the following. They provide useful information. Take a minute to familiarize yourself with their intent so you know which ones you should _really_ pay attention to. :)

  > [!NOTE]
  > Useful information that might help you.

  > [!Tip]
  > Helpful advice for doing things better or more easily.

  > [!Important]
  > Key information you may need to know to complete the lab.

  > [!Warning]
  > Urgent info that needs your immediate attention to avoid problems.

  > [!Caution]
  > Advises about risks or negative outcomes of certain actions.

<br>

---
> [!IMPORTANT]
> *As you work through the lab steps you will be asked to write actual code.* 🙌
>
> This lab is designed to encourage you to *write your own code* rather than copy/paste.
>
> In some instances there will be *pseudo-code* to guide you. In others, the code may already be partially implemented and/or simply commented out.
>
> However, if you would prefer a copy/paste approach you can click the suggestion above the chat input box `Show me the code` and Aiya will provide **the final code** for you to reference.
>
> You can also simply type `Show me the code for step XX`.
>
> ![Show me the code](./assets/images/show-me-the-code.png)
>
> ***We encourage you to try on your own first.***

---

***IGNORE THE FOLLOWING! INTERNAL TESTING***
<details open=true>
<summary>Testing Demo Platform Markdown</summary>
This is a test of the markdown renderer. Please ignore this.
</details>

<details>
<summary>Testing Demo Platform Markdown</summary>
<p style='padding: 15px'>This is a test of the markdown renderer. Please ignore this.</p>
</details>

<details>
<summary>Testing Demo Platform Markdown</summary>
  <table>
    <tr>
      <td>
        <b>US</b>
      </td>
      <td>
        /ˈtuːpəl/
      </td>
      <td>
        <audio controls>
          <source src='./assets/audio/tuples_en_us.mp3' type='audio/mpeg'>
          Sadly audio is not supported
        </audio>
      </td>
    </tr>
    <tr>
      <td>
        <b>UK</b>
      </td>
      <td>
        /ˈtjuːpəl/
      </td>
      <td>
        <audio controls>
          <source src='./assets/audio/tuples_en_uk.mp3' type='audio/mpeg'>
          Sadly audio is not supported
        </audio>
      </td>
    </tr>
  </table>
</details>

What is <abbr title='Retrieval-Augmented Generation'>RAG</abbr>?

<mark>Highlighting</mark>

<small>Small text</small> Big text

This is <q>An inline quote</q>

Sample Output: <samp>Hey there!</samp>

Keyboard input: <kbd>Ctrl</kbd> + <kbd>C</kbd>

Figure:
<figure>
<img src='./assets/images/show-me-the-code.png'/>
<figcaption>Fig 1. Optional Aiya helper</figcaption>
</figure>

MD Table
|        |            |                                                                                                                      |
| ------ | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| **US** | /ˈtuːpəl/  | <audio controls><source src='./assets/audio/tuples_en_us.mp3' type='audio/mpeg'>Sadly audio is not supported</audio> |
| **UK** | /ˈtjuːpəl/ | <audio controls><source src='./assets/audio/tuples_en_uk.mp3' type='audio/mpeg'>Sadly audio is not supported</audio> |

HTML Table
<table>
  <tr>
    <td>
      <b>US</b>
    </td>
    <td>
      /ˈtuːpəl/
    </td>
    <td>
      <audio controls>
        <source src='./assets/audio/tuples_en_us.mp3' type='audio/mpeg'>
        Sadly audio is not supported
      </audio>
    </td>
  </tr>
  <tr>
    <td>
      <b>UK</b>
    </td>
    <td>
      /ˈtjuːpəl/
    </td>
    <td>
      <audio controls>
        <source src='./assets/audio/tuples_en_uk.mp3' type='audio/mpeg'>
        Sadly audio is not supported
      </audio>
    </td>
  </tr>
</table>

tuples | **too**•plz

US /ˈtuːpəl/

<audio controls>
  <source src='./assets/audio/tuples_en_us.mp3' type='audio/mpeg'>
  Sadly audio is not supported :(
</audio>

UK /ˈtjuːpəl/

<audio controls>
  <source src='./assets/audio/tuples_en_uk.mp3' type='audio/mpeg'>
  Sadly audio is not supported :(
</audio>


*Inside Github Alert*
> [!NOTE]
> US /ˈtuːpəl/
>
> <audio controls>
>   <source src='./assets/audio/tuples_en_us.mp3' type='audio/mpeg'>
>   Sadly audio is not supported :(
> </audio>
>
> UK /ˈtjuːpəl/
>
> <audio controls>
>   <source src='./assets/audio/tuples_en_uk.mp3' type='audio/mpeg'>
>   Sadly audio is not supported :(
> </audio>