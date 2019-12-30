RED=$(tput setaf 1)
NORMAL=$(tput sgr0)
regex="#[0-9]+:"
commitMessage=`cat .git/COMMIT_EDITMSG`
if ! [[ $commitMessage =~ $regex ]]; then
  echo "${RED}ERROR - Issue number is missing from the commit msg. Should be in the form of #TicketNumber: Description$NORMAL"
  exit 1
fi
exit 0