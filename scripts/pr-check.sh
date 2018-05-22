if [[ -z "$CI_PULL_REQUEST" ]]; then
    echo "Not a PR build. Skipping....."
    exit 0
fi

PATH=$(npm bin):$PATH

github-pr-check --number ${CIRCLE_PR_NUMBER:-basename $CI_PULL_REQUEST}

