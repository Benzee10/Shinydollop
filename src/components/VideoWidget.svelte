
<script lang="ts">
  import { onMount } from 'svelte';
  
  let isVisible = true;
  let isMinimized = false;
  let videoElement: HTMLVideoElement;
  
  const toggleMinimize = () => {
    isMinimized = !isMinimized;
  };
  
  const closeWidget = () => {
    isVisible = false;
  };
  
  onMount(() => {
    // Auto-play video when component mounts
    if (videoElement) {
      videoElement.play().catch(console.error);
    }
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
        <video
          bind:this={videoElement}
          controls
          muted
          loop
          class="video-player"
          poster="https://via.placeholder.com/320x180?text=Video+Thumbnail"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
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
  
  .video-player {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
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
