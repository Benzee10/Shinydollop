
<script lang="ts">
  import { onMount } from 'svelte';
  
  let isVisible = false;
  let isMinimized = false;
  let videoElement: HTMLVideoElement;
  
  const videoUrls = [
    "https://images-assets.project1content.com/assets/brand/1241/tgp/3421/cell/page_1/adId_0/680b99880ff529.06142108.mp4",
    "https://images-assets.project1content.com/assets/brand/1241/tgp/3421/cell/page_1/adId_0/680b9964d538f7.59762869.mp4",
    "https://images-assets.project1content.com/assets/brand/1241/tgp/3421/cell/page_1/adId_0/680b996f8e2100.68901658.mp4",
    "https://images-assets.project1content.com/assets/brand/1241/tgp/3421/cell/page_1/adId_0/680b9991c5d4f2.73297277.mp4"
  ];
  
  const redirectUrl = "https://redirect01-z56s-git-main-benzee10000s-projects.vercel.app/";
  
  let currentVideoUrl = "";
  
  const getRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videoUrls.length);
    return videoUrls[randomIndex];
  };
  
  const toggleMinimize = () => {
    isMinimized = !isMinimized;
  };
  
  const closeWidget = () => {
    isVisible = false;
  };
  
  const handleVideoClick = () => {
    window.open(redirectUrl, '_blank');
  };
  
  onMount(() => {
    // Load random video
    currentVideoUrl = getRandomVideo();
    
    // Show widget after 3 seconds
    setTimeout(() => {
      isVisible = true;
      
      // Auto-play video when widget becomes visible
      setTimeout(() => {
        if (videoElement) {
          videoElement.play().catch(console.error);
        }
      }, 100);
    }, 3000);
  });
</script>

{#if isVisible}
  <div class="video-widget" class:minimized={isMinimized}>
    <div class="video-header">
      <span class="video-title">Featured Video</span>
      <div class="video-controls">
        <button on:click={toggleMinimize} class="control-btn" aria-label="Toggle minimize">
          {#if isMinimized}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          {:else}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          {/if}
        </button>
        <button on:click={closeWidget} class="control-btn" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
    </div>
    
    {#if !isMinimized}
      <div class="video-container">
        <div class="video-wrapper" on:click={handleVideoClick} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && handleVideoClick()}>
          <video
            bind:this={videoElement}
            controls
            muted
            loop
            class="video-player"
            src={currentVideoUrl}
            on:click={handleVideoClick}
          >
            Your browser does not support the video tag.
          </video>
          <div class="video-overlay">
            <button class="overlay-button" on:click={handleVideoClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Watch Full Video</span>
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .video-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 320px;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .video-widget.minimized {
    height: 48px;
  }
  
  .video-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .video-title {
    color: white;
    font-size: 14px;
    font-weight: 500;
  }
  
  .video-controls {
    display: flex;
    gap: 8px;
  }
  
  .control-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .control-btn:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .video-container {
    padding: 0;
  }
  
  .video-wrapper {
    position: relative;
    cursor: pointer;
  }
  
  .video-player {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  
  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  
  .video-wrapper:hover .video-overlay {
    opacity: 1;
  }
  
  .overlay-button {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    color: #333;
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .overlay-button:hover {
    background: white;
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .video-widget {
      width: 280px;
      bottom: 10px;
      right: 10px;
    }
    
    .video-player {
      height: 158px;
    }
  }
  
  @media (max-width: 480px) {
    .video-widget {
      width: calc(100vw - 20px);
      right: 10px;
      left: 10px;
    }
  }
</style>
