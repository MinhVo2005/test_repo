# test_repo
Testing google form to github issue


# 1. Set up Github API key
- Create a fine-grain API key
- Set name and description
- Choose resource owner as mcgill-ecsess
- Limit repo to ECSESS and set permission to issues read and write

# 2. Set up Google Form
- Create form
- Link spreadsheet to the form
- Add an Appscript and paste in the code
- Create env var of GITHUB_API, OWNER, REPO (github api key, repo owner or org, repo name)
- Setup trigger (Change to on form submit)

## You should be set!
