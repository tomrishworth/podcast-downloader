<template>
  <div class="container py-5 mb-5">
    <h1>Help</h1>
    <p class="mb-5">This site provides a way to download podcast episodes to your computer.</p>
    <h2 class="h5">
      <span class="badge badge-secondary">Step 1</span>
    </h2>
    <h3 class="h4">Find the podcast ID</h3>
    <div class="d-flex">
      <div class="pr-4">
        <p>
          In Apple Podcast app, find the copy link icon. The copied url will have the podcast Id at the end. e.g.
          https://podcasts.apple.com/nz/podcast/slow-burn/id1315040130.
        </p>
        <p>
          <code>1315040130</code> is the ID in this example
        </p>
        <p>Paste this into the form on the homepage</p>
      </div>
      <div>
        <img class="img-fluid" src="https://s3.amazonaws.com/tom_rishworth/get-podcast-id.png" />
      </div>
    </div>
    <hr />
    <h2 class="h5">
      <span class="badge badge-secondary">Step 2</span>
    </h2>
    <h3
      class="h4 mb-4"
    >Copy episode link &amp; paste into your computers command line tool to download episode</h3>
    <p>
      The copied text looks like...
      <br />
      <code>curl -L https://www.podtrac.com/pts/redirect.mp3/traffic.megaphone.fm/SLT3463580781.mp3 -o slow-burn-s3-ep-1-against-the-world.mp3</code>
    </p>
    <p>This is a curl command (cURL is a command-line tool for getting or sending data including files using URL syntax).</p>
    <p>Paste this into your command line and hit enter to download the episode.</p>
    <p>
      <strong>Not sure how to use a command line tool?</strong>
    </p>
    <p>
      <a
        target="_blank"
        href="https://www.wikihow.com/Open-a-Terminal-Window-in-Mac"
      >Instructions for mac users</a>
    </p>
    <p>
      <a
        target="_blank"
        href="https://www.lifewire.com/how-to-open-command-prompt-2618089"
      >Instructions for windows users</a>
    </p>
  </div>
</template>
