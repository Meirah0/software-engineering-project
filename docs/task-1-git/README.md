# Task 1 – Git

## Goal

The goal of this task is to show that I used and understood basic Git version control commands during the Software Engineering project.

This task documents how I worked with:

* Git repository usage
* commits
* branch workflow
* pull request and merge
* commit history
* Git time travelling with `git checkout`

Git was used to track changes, organize the project step by step, and document the development process in a public GitHub repository.

## Repository Used

This task is based on the main Software Engineering project repository:

```text
software-engineering-project
```

The repository contains the Software Engineering documentation, source code, screenshots, tests, workflow files, and task folders.

## What I Practiced

For this Git task, I practiced the following:

1. Creating and updating a GitHub repository
2. Adding project files and documentation
3. Making commits with clear commit messages
4. Creating a separate branch
5. Making a change on the branch
6. Opening a Pull Request
7. Merging the branch back into `main`
8. Reviewing Git history
9. Using Git time travelling with a specific commit ID
10. Returning from an older commit back to the current `main` branch

## Git Commands Used

During the project, I used these Git concepts and commands:

```bash
git status
git add .
git commit -m "message"
git branch
git checkout <commit-id>
git log --oneline -1
git switch main
```

These commands helped me understand how Git tracks changes and how older versions of a project can be reviewed.

## Branch and Merge Workflow

To practice branching and merging, I created a separate branch for the Git workflow documentation.

The branch was used to make a change separately from the `main` branch. After the change was completed, I opened a Pull Request and merged it back into `main`.

This helped me understand the basic Git collaboration workflow:

1. Start from `main`
2. Create a separate branch
3. Make a change on the branch
4. Commit the change
5. Open a Pull Request
6. Merge the Pull Request into `main`

## Branch and Merge Screenshot

This screenshot shows the Pull Request that was successfully merged back into the `main` branch.

![Git Branch Merge Workflow](./task-1-branch-merge-workflow.png)

## Git Time Travelling with Checkout

For Git time travelling, I used `git checkout` with a specific commit ID from my repository.

The commit ID I used was:

```text
9c593cf
```

This commit belongs to an older project state:

```text
Add HorseCare Manager GUI
```

I used the following command:

```bash
git checkout 9c593cf
```

This command moved the project temporarily to an older commit. Git showed the repository in a `detached HEAD` state, which means I was viewing a previous version of the project instead of the current `main` branch.

To verify that I was really at the older commit, I used:

```bash
git log --oneline -1
```

This showed the selected older commit:

```text
9c593cf Add HorseCare Manager GUI
```

After reviewing the older project state, I returned to the current main branch using:

```bash
git switch main
```

Finally, I checked the repository status again:

```bash
git status
```

This confirmed that I was back on the `main` branch and that the working tree was clean.

## Time Travelling Screenshot

This screenshot shows the full Git time travelling process:

1. Starting on the `main` branch
2. Checking out an older commit with `git checkout 9c593cf`
3. Seeing the repository in detached HEAD state
4. Verifying the old commit with `git log --oneline -1`
5. Returning to `main` with `git switch main`
6. Checking that the repository is clean again

![Git Checkout Time Travelling](./task-1-git-checkout-time-travel.png)

## What I Learned

This task helped me understand that Git is not only used to save files, but also to control the history of a software project.

I learned that branches are useful because they allow changes to be developed separately before being merged into the main project.

I also learned that Git time travelling means moving to an older commit to inspect a previous version of the project. The most important part was understanding that `git checkout <commit-id>` allows me to view an older state, and `git switch main` brings me back to the current branch.

## Reflection

At first, I thought that opening an old commit in GitHub was enough to show time travelling. After feedback, I understood that the important part is applying the Git command directly.

By using:

```bash
git checkout 9c593cf
```

I was able to move back to an older project state. Then, by using:

```bash
git switch main
```

I returned safely to the current version of the project.

This helped me understand Git history more clearly and showed me how version control can be used to inspect earlier versions without losing the current work.
