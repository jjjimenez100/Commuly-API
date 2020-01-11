echo "I got executed"
wget https://firebasestorage.googleapis.com/v0/b/coursely-stg.appspot.com/o/aws-ec2-keys%2Fcommuly-api.pem?alt=media -O commuly-api.pem

chmod 400 commuly-api.pem

pwd
ls

ssh -i "commuly-api.pem" ec2-user@ec2-54-225-55-219.compute-1.amazonaws.com -o StrictHostKeyChecking=no

pwd
ls