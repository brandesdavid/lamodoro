## lamodoro timer

spielt eine zufällige episode digimon jedes mal ab, wenn der timer zu ende ist. 

## python scraper

der scraper looped durch staffel 1 bis 2 und episode 1 bis 49 
auf der webseite, und speichert das einfach in eine json. das programm ruft die json datei auf und 
wählt zufällig eine url.

(externes tool eigentlich, pack danach die json datei in den src/components ordner)
du kannst es builden in dem du ```npm run package``` in der konsole aufrufst.



```bash
python3 digimon.py

```

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/brandesdavid/lamodoro your-project-name
cd your-project-name
npm install
```

**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

