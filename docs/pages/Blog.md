# Blog

To setup a blog for your documentation website all you have to do is create a `blog/` folder in your src and start writing blog posts. That's it.

## Blog Front Matter

At the start of each blog post you must have a front matter. This section specifies metadata about your blog post that will also be used to render the header.

## Title

```markdown
---
title: First Post
---
```

## Hero Image

Control the background of the hero on the blog. Works better with wide images. (Twitter banners work great!)

```markdown
---
image: https://pbs.twimg.com/profile_banners/7547562/1516584955/1500x500
---
```

## Author

```markdown
---
author: Andrew Lisowski
---
```

### Profile Pic

Ignite uses [gravatar](http://en.gravatar.com/) to find a profile pic for your blog posts.

```markdown
---
author:
  name: Andrew Lisowski
  email: suacy.badger@gmail.com
---
```

### Name Link

Have your name link to any website.

```markdown
---
author:
  name: Andrew Lisowski
  link: https://github.intuit.com/alisowski
---
```
