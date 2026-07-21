# GoodStack

A good webstack that focuses on modern tooling, type-safety, and shortcuts. Mission statement: developer experience, rapid prototyping, and deployment. This is an alternative approach to SPA and general web development with a different tech that asks for elegance and maintainability. 👍🏼

## Stack

| Asset     | Tool            |
| ---       | ---             |
| Document  | Pug             |
| Styles    | SCSS + Tailwind |
| Scripting | Typescript      |
| Data      | Drizzle         |
| State     | AlpineJS        |

## Optional Features

- Database client (MySQL)
- Rate limiting
- No-BS mounting rendered Pug elements into roots

## Why this?

1. **React uses HTML** ❌
    - Bad. HTML is boilerplate. Replace HTML with Pug, treat it as first-class citizen, and get compiled into HTML without directly interacting with HTML.
2. **More stimming** 💡
    - You can trust Typescript to fill out everything for you. 
    - You can import SCSS in Typescript to style without referencing it in the document.
    - You can import Pug as a template function to use it in a component class or re-use the element as much as you'd want.
    - You believe in type supremacy, a cult where incorrect values are catched on during compile-time without wasting hours on debugging a missing print in the console.
3. **My needs** 🐻
    - Yes, I am running on a server that only has MySQL installed. Hence, the current pool is catered to MySQL servers. You can change this if you'd like.
    - Object-oriented obsession. If you like inheritances, this is for you. If you like the philosophy of SCSS, this is much for you.
    - I'm lazy. I'd rather spend time curating a template that compiles for me rather than take ten seconds to run tasks each time which can accumulate.

# 📐 Setup

1. [Create](https://github.com/new?template_name=GoodStack&template_owner=comicallynathan) a new repository based on the template.
2. `bun i`
3. Run `bun run watch`
4. That's it

## 🏗️ Building

```
bun build src/engine/app.ts --outdir build/dist --target RUNTIME
```

Replace `RUNTIME` with your preferred runtime.

## 📂 References

```json
src
| --- client // This is where you hold the Typescript files which will automatically be compiled and ready for the client to use. `index.ts` is the main character.
|
| --- engine // This is the server side. This is where you do the backend work. 
|     | --- core // This is where items will be processed for production. Do not change unless you know what you are doing.
|
| --- web // This is often "shared" between the server and the client. This directory also contains .pug files as pages. They're automatically registered.
| --- | --- components // This is where you would keep your reusable rPug components. E.g., an essential header.
|     | --- static // This is where you will source your materials to the public.
|     | --- styles // This is where you can add styles to your website.

```

# 👍🏼
Enjoy.
