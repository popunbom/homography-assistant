# homography-assistant


## Requirements

- Node.js
- yarn
  ```bash
  npm install -g yarn
  ```
- Python ( `>3.8` )
  - Pipenv： `$ pip3 install pipenv`

## Set-Up

### Frontend
```bash
cd frontend
yarn 
```

### Backend
```bash
cd backend
$ pip3 install pipenv
$ PIPENV_VENV_IN_PROJECT=true pipenv install
```

## Run App

1. Exec following `Frontend` and `Backend`
2. Open `http://localhost:8080` in browser

### Frontend
```bash
cd frontend
yarn serve
```

### Backend
```bash
cd backend
pipenv run python3 app.py
```

## Author
- popunbom <fantom0779@gmail.com>
- rain <@rain9525>

## LICENSE

MIT
