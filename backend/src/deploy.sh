set -e # 에러 발생 시 스크립트 종료

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install
nvm use

cd ~/my-ticket/backend

git pull origin main

yarn cache clean
yarn install --frozen-lockfile
yarn test
yarn build

pm2 restart ecosystem.config.js
