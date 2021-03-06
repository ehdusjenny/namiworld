#Git

To learn the technical basics of Git, please refer to [Using Git][using_git]

Git is a distributed version control system.

Git treats its data differently than other VCS. Most other systems store information as a set of files and the changes made to each file over time.

Git thinks of its data like a set of snapshots of a filesystem. Every time you save the state of your project, it takes a picture of what your files look like at that moment and stores a reference to those snapshots. If file has not changed, Git will just link the previous file. Git thinks about its data like a **stream of snapshots**.

#Locality and Speed
With CVCS, every operation has network latency overhead, but most operations in Git is local. The entire history of your project is on your local disk so most operations are super-fast. This also means you can work offline! 

#Data Integrity
Everything in Git is checksummed and is referred by that checksum, so it's impossible to modify the content without Git knowing.

#Three States
Your file(s) can be in one of three states: **committed**, **modified** or **staged**.

**Committed** means your data is safely stored in your local database.
**Modified** means you've changed the file but have not committed it yet.
**Staged** means you have marked a modified file in its current version to be included in your next commit snapshot.
**Tracked**: Files included in the last snapshot.
**Untracked**: Files not included in the last snapshot and not in staging.

Your current working tree is a single checkout of one version of the project. After you modify files, you can add them to the staging area, and then commit them together to permanently store the snapshot in your .git directory.

The .git directory stores metadata and object database for your project. When you clone a repo, this is what you copy.

#Branching
Branching means you diverge from the main line of development and continue to do work without messing with the main line. You can branch off to fix a specific problem, test out a possible solution, for each programmer to have their own copy of the main line, etc. 

When you commit, Git creates a commit object that contains the author name, email, message, a pointer to the previous commit (multiple pointers if the commit resulted from merging multiple branches), and a pointer to the snapshot of the content you staged. 

You can branch back and forth super quickly in Git. Git Branching is simply a lightweight movable pointer to a commit.



[using_git]: http://www.nami.kim/#!/tech/using_git "Using Git"