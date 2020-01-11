# -p url to use to fetch ssh keys for EC2
# -s file name of ssh keys
# -u host url with username
# -d directory name of the project to cd in
# -b branch name to pull changes with
# -e url link for the env file
while getopts p:s:u:d:b:e: option
do
case "${option}"
in
p) SSH_KEYS_URL=${OPTARG};;
s) SSH_KEYS=${OPTARG};;
u) HOST_URL=${OPTARG};;
d) PROJECT_DIRECTORY=${OPTARG};;
b) BRANCH_NAME=${OPTARG};;
e) ENV_URL=${OPTARG};;
esac
done

echo "Fetching SSH keys for EC2 instance"
wget ${SSH_KEYS_URL} -O ${SSH_KEYS}

echo "Changing permission for ssh keys"
chmod 400 commuly-api.pem

echo "Using SSH to access EC2 instance"
echo "Deploying changes..."
ssh -i ${SSH_KEYS} ${HOST_URL} -o StrictHostKeyChecking=no "cd ${PROJECT_DIRECTORY} && git pull origin ${BRANCH_NAME} && wget ${ENV_URL} -O .env && yarn install && pm2 restart all"

echo "Done deploying changes to EC2 instance"