/**
 * ============================================================================
 * HAPPY BIRTHDAY, SUNU! 🎂❤️
 * Friendship Protocol v1.0
 * Master JavaScript Logic — Secret Experience, Verification, Gallery & Audio
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. CONFIGURATION (Easy to customize, no JS logic changes needed later)
// ---------------------------------------------------------------------------
const CONFIG = {
  // Verification Target Information
  friendName: "PRITI KARMAKAR",
  displayName: "SuNu",
  myName: "SWAGATO GHOSH",
  friendNickname: "sunu",
  myNickname: "sagu",

  // Asset File Paths (Simply replace files inside assets/ with these exact names)
  photos: [
    "assets/photo1.jpeg",
    "assets/photo2.jpeg",
    "assets/photo3.jpeg",
    "assets/photo4.jpeg",
    "assets/photo5.jpeg",
    "assets/photo6.jpeg",
    "assets/photo7.jpeg",
    "assets/photo8.jpeg"
  ],

  // Photo Memory Details & Captions
  photoCaptions: [
    {
      tag: "Favorite Memory ✦",
       title: "The Beginning of Our Story",
      desc: "A friendship that quietly changed everything ✨"
    },
    {
      tag: "Memory 02",
      title: "Endless Talks & Laughter",
      desc: "Sharing every small detail of the day 🌙"
    },
    {
      tag: "Memory 03",
      title: "Our first Durga Puja together.",
      desc: "Our favorite memory celebrating together 🌸✨"
    },
    {
      tag: "Memory 04",
      title: "Silly Moments & Smiles",
      desc: "The jokes and laughs that never get old 💫"
    },
    {
      tag: "Memory 05",
      title: "A Safe Little Corner",
      desc: "Someone I could talk to without thinking twice 🕊️"
    },
    {
      tag: "Memory 06",
      title: "Ordinary Days Made Special",
      desc: "Turning simple everyday moments into forever memories ☕"
    },
    {
      tag: "Memory 07",
      title: "Side by Side Through Everything",
      desc: "An irreplaceable bond between two best friends 🌟"
    },
    {
      tag: "Memory 08",
      title: "To a Lifetime of Memories",
      desc: "Happy Birthday SuNu, today, tomorrow, and always ❤️"
    }
  ],

  // Audio Files
  music: "assets/birthday-song.mp3",
  finalVoice: "assets/final-voice.mp3"
};

// ---------------------------------------------------------------------------
// 2. GLOBAL STATE
// ---------------------------------------------------------------------------
const STATE = {
  currentStage: "terminal", // terminal | access | reveal | gallery | letter | final
  verificationStep: 0,
  currentPhotoIndex: 0,
  isMusicPlaying: false,
  isVoicePlaying: false,
  musicAudio: null,
  voiceAudio: null,
  synthAudioActive: false
};

// ---------------------------------------------------------------------------
// 3. VERIFICATION SEQUENCE QUESTIONS
// ---------------------------------------------------------------------------
const VERIFICATION_QUESTIONS = [
  {
    stepTag: "STEP 1/4",
    context: "Before we begin...",
    question: "What's your name?",
    expected: [CONFIG.friendName, "priti karmakar", "priti"],
    placeholder: "e.g. Priti Karmakar",
    wrongMsg: "Hmm... that's not what I remember. 👀 Try again.",
    successMsg: "Identity confirmed: Welcome, Priti! ✨"
  },
  {
    stepTag: "STEP 2/4",
    context: "Okay... one more thing. 👀",
    question: "Who is your best friend?",
    expected: [CONFIG.myName, "swagato ghosh", "swagato"],
    placeholder: "e.g. Swagato Ghosh",
    wrongMsg: "Hmm... I think you know this one. Try again. ❤️",
    successMsg: "Best friend verified ✓"
  },
  {
    stepTag: "STEP 3/4",
    context: "Let's see if you really know me... ❤️",
    question: "What do I call you?",
    expected: [CONFIG.friendNickname, "sunu"],
    placeholder: "What nickname do I use?",
    wrongMsg: "That doesn't sound like you... 👀 Try again.",
    successMsg: "Nickname verified: Hey SuNu! ✨"
  },
  {
    stepTag: "STEP 4/4",
    context: "Last question...",
    question: "What do you call me?",
    expected: [CONFIG.myNickname, "sagu"],
    placeholder: "What do you call me?",
    wrongMsg: "Almost... but that's not what you call me. 😌",
    successMsg: "Connection verified: Access Granted ❤️"
  }
];

// Helper: Normalize input (case-insensitive & trimmed whitespace)
function normalizeInput(val) {
  if (!val) return "";
  return val.trim().replace(/\s+/g, " ").toLowerCase();
}

// ---------------------------------------------------------------------------
// 4. DOM ELEMENTS
// ---------------------------------------------------------------------------
const DOM = {};

document.addEventListener("DOMContentLoaded", () => {
  // Stages
  DOM.terminalStage = document.getElementById("terminal-stage");
  DOM.accessStage = document.getElementById("access-stage");
  DOM.revealStage = document.getElementById("reveal-stage");
  DOM.galleryStage = document.getElementById("gallery-stage");
  DOM.letterStage = document.getElementById("letter-stage");
  DOM.finalStage = document.getElementById("final-stage");

  // Terminal & Verification
  DOM.terminalCard = document.querySelector(".terminal-card");
  DOM.terminalBootLines = document.getElementById("terminal-boot-lines");
  DOM.verificationBox = document.getElementById("verification-box");
  DOM.questionCard = document.getElementById("question-card");
  DOM.verifyMomentBadge = document.getElementById("verify-moment-badge");
  DOM.questionContent = document.getElementById("question-content");
  DOM.promptStageTag = document.getElementById("prompt-stage-tag");
  DOM.promptContext = document.getElementById("prompt-context");
  DOM.promptQuestion = document.getElementById("prompt-question");
  DOM.verifyForm = document.getElementById("verify-form");
  DOM.verifyInput = document.getElementById("verify-input");
  DOM.verifyFeedback = document.getElementById("verify-feedback");
  DOM.verifySubmitBtn = document.getElementById("verify-submit-btn");

  // Access Stage
  DOM.openSurpriseBtn = document.getElementById("open-surprise-btn");

  // Reveal Stage
  DOM.exploreMemoriesBtn = document.getElementById("explore-memories-btn");

  // Gallery Stage
  DOM.galleryImg = document.getElementById("gallery-img");
  DOM.imgFallback = document.getElementById("img-fallback");
  DOM.fallbackTag = document.getElementById("fallback-tag");
  DOM.fallbackTitle = document.getElementById("fallback-title");
  DOM.memoryCounter = document.getElementById("memory-counter");
  DOM.memoryTag = document.getElementById("memory-tag");
  DOM.memoryTitle = document.getElementById("memory-title");
  DOM.memoryDesc = document.getElementById("memory-desc");
  DOM.galleryPrevBtn = document.getElementById("gallery-prev-btn");
  DOM.galleryNextBtn = document.getElementById("gallery-next-btn");
  DOM.galleryDots = document.getElementById("gallery-dots");
  DOM.gotoLetterBtn = document.getElementById("goto-letter-btn");

  // Letter Stage
  DOM.letterPreTransition = document.getElementById("letter-pre-transition");
  DOM.letterMainContent = document.getElementById("letter-main-content");
  DOM.gotoFinalBtn = document.getElementById("goto-final-btn");

  // Final Stage
  DOM.finalHeader = document.getElementById("final-header");
  DOM.finalWhisperBox = document.getElementById("final-whisper-box");
  DOM.finalWhisper = document.getElementById("final-whisper");
  DOM.quoteLine1 = document.getElementById("quote-line-1");
  DOM.quoteLine2 = document.getElementById("quote-line-2");
  DOM.quoteLine3 = document.getElementById("quote-line-3");
  DOM.voiceListenIndicator = document.getElementById("voice-listen-indicator");
  DOM.voiceBox = document.getElementById("voice-box");
  DOM.voiceWaveform = document.getElementById("voice-waveform");
  DOM.voiceProgressBar = document.getElementById("voice-progress-bar");
  DOM.voiceReplayBtn = document.getElementById("voice-replay-btn");
  DOM.voiceStatus = document.getElementById("voice-status");
  DOM.voicePlaceholderNotice = document.getElementById("voice-placeholder-notice");
  DOM.finalCreditBlock = document.getElementById("final-credit-block");
  DOM.replayBlock = document.getElementById("replay-block");
  DOM.replayBtn = document.getElementById("replay-btn");

  // Audio Widget & Elements
  DOM.musicWidget = document.getElementById("music-widget");
  DOM.musicToggleBtn = document.getElementById("music-toggle-btn");
  DOM.musicIcon = document.getElementById("music-icon");
  DOM.musicLabel = document.getElementById("music-label");
  DOM.bgMusic = document.getElementById("bg-music");
  DOM.voiceNote = document.getElementById("voice-note");

  // Initialize Canvas
  initCanvas();

  // Setup Audio Elements
  setupAudio();

  // Start Terminal Sequence
  runTerminalBootSequence();

  // Setup Event Listeners
  setupEventListeners();

  // Setup Gallery Controls
  setupGallery();
});

// ---------------------------------------------------------------------------
// 5. STAGE ROUTER
// ---------------------------------------------------------------------------
function switchStage(stageName) {
  STATE.currentStage = stageName;
  const stages = [
    DOM.terminalStage,
    DOM.accessStage,
    DOM.revealStage,
    DOM.galleryStage,
    DOM.letterStage,
    DOM.finalStage
  ];

  stages.forEach(st => {
    if (st) {
      st.classList.remove("active");
    }
  });

  // Seamless full-viewport theme management:
  // Post-verification sections (access, reveal, gallery, letter, final) share the continuous deep blue night sky
  if (stageName === "terminal") {
    document.body.classList.add("theme-terminal");
    document.body.classList.remove("theme-nightsky");
  } else {
    document.body.classList.remove("theme-terminal");
    document.body.classList.add("theme-nightsky");
  }

  let activeElement = null;
  switch (stageName) {
    case "terminal": activeElement = DOM.terminalStage; break;
    case "access": activeElement = DOM.accessStage; break;
    case "reveal": activeElement = DOM.revealStage; break;
    case "gallery": activeElement = DOM.galleryStage; break;
    case "letter": activeElement = DOM.letterStage; break;
    case "final": activeElement = DOM.finalStage; break;
  }

  if (activeElement) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      activeElement.classList.add("active");
    }, 50);
  }

  // Canvas visual adjustment per stage
  if (window.setCanvasStage) {
    window.setCanvasStage(stageName);
  }
}

// ---------------------------------------------------------------------------
// 6. TERMINAL BOOT SEQUENCE & VERIFICATION
// ---------------------------------------------------------------------------
function runTerminalBootSequence() {
  const bootLines = [
    { text: "BIRTHDAY.exe v1.0 [Initializing Secure Protocol...]", delay: 300 },
    { text: "Loading memories and friendship core... ✓", delay: 600, class: "term-success" },
    { text: "Checking encrypted connection... ✓", delay: 900, class: "term-success" },
    { text: "Searching for someone special... ✓", delay: 1200, class: "term-success" },
    { text: "PERSON DETECTED: Special Identity Lock Engaged.", delay: 1500, class: "term-highlight" }
  ];

  let currentLineIndex = 0;

  function typeNextLine() {
    if (currentLineIndex < bootLines.length) {
      const item = bootLines[currentLineIndex];
      const p = document.createElement("div");
      p.className = `term-line ${item.class || ""}`;
      p.innerHTML = `<span class="term-prefix">[SYS]</span> <span class="term-text">${item.text}</span>`;
      DOM.terminalBootLines.appendChild(p);

      currentLineIndex++;
      setTimeout(typeNextLine, item.delay);
    } else {
      // Boot complete, show cursor and verification box
      setTimeout(() => {
        DOM.verificationBox.classList.remove("hidden");
        loadVerificationStep(0);
      }, 400);
    }
  }

  typeNextLine();
}

function loadVerificationStep(stepIndex) {
  STATE.verificationStep = stepIndex;
  const q = VERIFICATION_QUESTIONS[stepIndex];
  if (!q) return;

  if (DOM.promptStageTag) DOM.promptStageTag.textContent = q.stepTag;
  if (DOM.promptContext) DOM.promptContext.textContent = q.context;
  if (DOM.promptQuestion) DOM.promptQuestion.textContent = q.question;
  if (DOM.verifyInput) {
    DOM.verifyInput.value = "";
    DOM.verifyInput.placeholder = q.placeholder || "Type your answer here...";
  }
  if (DOM.verifyFeedback) {
    DOM.verifyFeedback.textContent = "";
    DOM.verifyFeedback.className = "verify-feedback";
  }
}

let isVerifying = false;

function handleVerification(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Prevent multiple simultaneous submissions during transition
  if (isVerifying) return;

  const currentQ = VERIFICATION_QUESTIONS[STATE.verificationStep];
  if (!currentQ) return;

  const rawVal = DOM.verifyInput ? DOM.verifyInput.value : "";
  const normalizedVal = normalizeInput(rawVal);

  if (!normalizedVal) {
    showVerifyFeedback("Please type an answer to continue ✨", "hint");
    shakeInput();
    return;
  }

  // Support array of allowed variations or single string (case-insensitive & trimmed)
  const allowedAnswers = Array.isArray(currentQ.expected) ? currentQ.expected : [currentQ.expected];
  const isCorrect = allowedAnswers.some(ans => normalizeInput(ans) === normalizedVal);

  if (isCorrect) {
    isVerifying = true;

    // Prevent duplicate submission
    if (DOM.verifyInput) DOM.verifyInput.disabled = true;
    if (DOM.verifySubmitBtn) DOM.verifySubmitBtn.disabled = true;

    playSoftChime(587.33); // D5 chime

    const qContent = DOM.questionContent || DOM.questionCard;
    const momentBadge = DOM.verifyMomentBadge;

    // 1. Gently fade out and slightly blur / scale down current question
    if (qContent) {
      qContent.classList.add("question-blur-exit");
    }

    // 2. Show the short verification moment: "IDENTITY VERIFIED ✓"
    if (momentBadge) {
      momentBadge.classList.remove("hidden");
      void momentBadge.offsetWidth;
      momentBadge.classList.add("visible");
    }

    if (STATE.verificationStep < VERIFICATION_QUESTIONS.length - 1) {
      // Short verification moment (~400ms), then transition smoothly into next question
      setTimeout(() => {
        // Hide verification moment
        if (momentBadge) {
          momentBadge.classList.remove("visible");
          setTimeout(() => momentBadge.classList.add("hidden"), 200);
        }

        // Load next question
        loadVerificationStep(STATE.verificationStep + 1);

        // Next question fades and slides in naturally
        if (qContent) {
          qContent.classList.remove("question-blur-exit");
          qContent.classList.add("question-slide-enter");

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              qContent.classList.add("question-slide-enter-active");

              setTimeout(() => {
                qContent.classList.remove("question-slide-enter", "question-slide-enter-active");
                if (DOM.verifyInput) {
                  DOM.verifyInput.disabled = false;
                  DOM.verifyInput.focus();
                }
                if (DOM.verifySubmitBtn) DOM.verifySubmitBtn.disabled = false;
                isVerifying = false;
              }, 350);
            });
          });
        } else {
          if (DOM.verifyInput) {
            DOM.verifyInput.disabled = false;
            DOM.verifyInput.focus();
          }
          if (DOM.verifySubmitBtn) DOM.verifySubmitBtn.disabled = false;
          isVerifying = false;
        }
      }, 450);

    } else {
      // ALL 4 QUESTIONS COMPLETED -> IDENTITY VERIFIED -> ACCESS GRANTED
      setTimeout(() => {
        if (momentBadge) {
          momentBadge.classList.remove("visible");
          setTimeout(() => momentBadge.classList.add("hidden"), 200);
        }
        triggerAccessGranted();
        isVerifying = false;
      }, 600);
    }

  } else {
    // WRONG ANSWER
    showVerifyFeedback(currentQ.wrongMsg, "hint");
    shakeInput();
    playSoftChime(220); // Gentle low note
  }
}

// Alias for compatibility
function handleVerificationSubmit(e) {
  handleVerification(e);
}

function showVerifyFeedback(msg, type) {
  DOM.verifyFeedback.textContent = msg;
  DOM.verifyFeedback.className = `verify-feedback ${type}`;
}

function shakeInput() {
  const wrapper = DOM.verifyInput.closest(".input-wrapper");
  if (wrapper) {
    wrapper.classList.remove("shake");
    void wrapper.offsetWidth; // Trigger reflow
    wrapper.classList.add("shake");
    setTimeout(() => wrapper.classList.remove("shake"), 500);
  }
}

function triggerAccessGranted() {
  // Add terminal success line
  const p = document.createElement("div");
  p.className = "term-line term-success";
  p.innerHTML = `<span class="term-prefix">[OK]</span> <span class="term-text">ACCESS GRANTED ❤️ ALL CLEARANCES VERIFIED ✓</span>`;
  DOM.terminalBootLines.appendChild(p);

  setTimeout(() => {
    if (DOM.terminalCard) {
      DOM.terminalCard.classList.add("terminal-exit");
    }
    setTimeout(() => {
      switchStage("access");
      spawnConfettiBurst();
      if (DOM.terminalCard) {
        DOM.terminalCard.classList.remove("terminal-exit");
      }
    }, 600);
  }, 500);
}

// ---------------------------------------------------------------------------
// 7. MAIN REVEAL & SURPRISE
// ---------------------------------------------------------------------------
function handleOpenSurprise() {
  if (DOM.openSurpriseBtn) {
    DOM.openSurpriseBtn.classList.add("btn-pressed-transition");
  }

  // 1. Play Background Audio (only triggered directly by user gesture here)
  startBackgroundMusic();

  // 2. Reveal Floating Music Widget (minimal visualizer + mute/unmute control)
  if (DOM.musicWidget) {
    DOM.musicWidget.classList.remove("hidden");
  }

  // 3. Very subtle confetti burst (strictly non-excessive)
  spawnConfettiBurst();

  // 4. Smooth transition into the Birthday Reveal
  setTimeout(() => {
    switchStage("reveal");
  }, 400);
}

// ---------------------------------------------------------------------------
// 8. AUDIO MANAGEMENT
// ---------------------------------------------------------------------------
function setupAudio() {
  DOM.bgMusic.src = CONFIG.music;
  DOM.voiceNote.src = CONFIG.finalVoice;

  // Handle missing or placeholder audio files gracefully without browser alert
  DOM.bgMusic.addEventListener("error", (e) => {
    console.log("Audio notice: assets/birthday-song.mp3 fallback active (site working normally).");
  });

  DOM.voiceNote.addEventListener("error", (e) => {
    console.log("Voice notice: assets/final-voice.mp3 fallback active.");
    if (DOM.voicePlaceholderNotice) {
      DOM.voicePlaceholderNotice.classList.remove("hidden");
    }
  });

  // Track voice note playback progress
  DOM.voiceNote.addEventListener("timeupdate", () => {
    if (DOM.voiceNote.duration && DOM.voiceNote.duration > 0) {
      const pct = (DOM.voiceNote.currentTime / DOM.voiceNote.duration) * 100;
      DOM.voiceProgressBar.style.width = `${pct}%`;
    }
  });

  DOM.voiceNote.addEventListener("ended", () => {
    finishVoiceNote();
  });
}

function startBackgroundMusic() {
  if (!DOM.bgMusic) return;

  DOM.bgMusic.volume = 0.65;
  const playPromise = DOM.bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        STATE.isMusicPlaying = true;
        updateMusicWidgetState();
      })
      .catch((err) => {
        console.log("Audio playback notice: HTML5 audio unavailable, activating soft ambient melody.");
        STATE.isMusicPlaying = true;
        STATE.synthAudioActive = true;
        updateMusicWidgetState();
        startAmbientSynthMusic();
      });
  }
}

function toggleBackgroundMusic() {
  if (STATE.isMusicPlaying) {
    if (!STATE.synthAudioActive && DOM.bgMusic) {
      DOM.bgMusic.pause();
    }
    STATE.isMusicPlaying = false;
  } else {
    if (!STATE.synthAudioActive && DOM.bgMusic) {
      DOM.bgMusic.play().catch(() => {});
    }
    STATE.isMusicPlaying = true;
  }
  updateMusicWidgetState();
}

function updateMusicWidgetState() {
  if (DOM.musicToggleBtn) {
    if (STATE.isMusicPlaying) {
      DOM.musicToggleBtn.classList.add("playing");
      if (DOM.musicLabel) DOM.musicLabel.textContent = "Mute";
      if (DOM.musicIcon) DOM.musicIcon.textContent = "🎵";
      DOM.musicToggleBtn.setAttribute("title", "Click to Mute Music");
      DOM.musicToggleBtn.setAttribute("aria-label", "Mute Music");
    } else {
      DOM.musicToggleBtn.classList.remove("playing");
      if (DOM.musicLabel) DOM.musicLabel.textContent = "Unmute";
      if (DOM.musicIcon) DOM.musicIcon.textContent = "🔇";
      DOM.musicToggleBtn.setAttribute("title", "Click to Unmute Music");
      DOM.musicToggleBtn.setAttribute("aria-label", "Unmute Music");
    }
  }
}

// Soft Web Audio Synthesizer (Provides gentle musical chime fallback if audio file is silent or missing)
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSoftChime(freq = 440) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {}
}

let synthInterval = null;
function startAmbientSynthMusic() {
  if (synthInterval) return;
  // Gentle soothing birthday melody notes (C4, D4, E4, F4, G4, A4, B4, C5)
  const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63, 261.63, 261.63, 293.66, 261.63, 392.0, 349.23];
  let noteIndex = 0;
  synthInterval = setInterval(() => {
    if (STATE.isMusicPlaying) {
      playSoftChime(notes[noteIndex]);
      noteIndex = (noteIndex + 1) % notes.length;
    }
  }, 1200);
}

// ---------------------------------------------------------------------------
// 9. PHOTO MEMORY GALLERY
// ---------------------------------------------------------------------------
function setupGallery() {
  // Generate 8 pagination dots
  DOM.galleryDots.innerHTML = "";
  CONFIG.photos.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.className = `dot-btn ${idx === 0 ? "active" : ""}`;
    dot.setAttribute("aria-label", `Go to Memory ${idx + 1}`);
    dot.addEventListener("click", () => showPhoto(idx));
    DOM.galleryDots.appendChild(dot);
  });

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const memoryCard = document.getElementById("memory-card");

  if (memoryCard) {
    memoryCard.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    memoryCard.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextPhoto(); // Swiped left -> next
      } else {
        prevPhoto(); // Swiped right -> prev
      }
    }
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (STATE.currentStage === "gallery") {
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    }
  });

  // Initial Photo Load
  showPhoto(0);
}

function showPhoto(index) {
  if (index < 0) index = CONFIG.photos.length - 1;
  if (index >= CONFIG.photos.length) index = 0;

  STATE.currentPhotoIndex = index;
  const cap = CONFIG.photoCaptions[index] || {
    tag: `Memory ${index + 1}`,
    title: `Special Moment 0${index + 1}`,
    desc: "A moment etched in time ❤️"
  };

  // Animate photo transition
  DOM.galleryImg.classList.add("transitioning");

  setTimeout(() => {
    DOM.galleryImg.src = CONFIG.photos[index];
    DOM.galleryImg.alt = cap.title;

    DOM.memoryCounter.textContent = `MEMORY 0${index + 1} / 08`;
    DOM.memoryTag.textContent = cap.tag;
    DOM.memoryTitle.textContent = cap.title;
    DOM.memoryDesc.textContent = cap.desc;

    // Update active dot
    const dots = DOM.galleryDots.querySelectorAll(".dot-btn");
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });

    // Fallback handler if image fails to load
    DOM.galleryImg.onerror = () => {
      DOM.imgFallback.classList.remove("hidden");
      DOM.fallbackTag.textContent = `MEMORY 0${index + 1}`;
      DOM.fallbackTitle.textContent = cap.title;
    };

    DOM.galleryImg.onload = () => {
      DOM.imgFallback.classList.add("hidden");
    };

    DOM.galleryImg.classList.remove("transitioning");
  }, 220);
}

function nextPhoto() {
  showPhoto(STATE.currentPhotoIndex + 1);
}

function prevPhoto() {
  showPhoto(STATE.currentPhotoIndex - 1);
}

// ---------------------------------------------------------------------------
// 10. FINAL ENDING & VOICE NOTE
// ---------------------------------------------------------------------------
function startFinalSequence() {
  switchStage("final");

  // Reset any previous state on final screen elements
  if (DOM.finalWhisperBox) {
    DOM.finalWhisperBox.classList.remove("hidden", "fade-out");
    DOM.finalWhisperBox.classList.add("visible");
  }
  if (DOM.finalHeader) {
    DOM.finalHeader.classList.add("hidden");
    DOM.finalHeader.classList.remove("visible");
  }
  if (DOM.quoteLine1) DOM.quoteLine1.classList.remove("visible");
  if (DOM.quoteLine2) DOM.quoteLine2.classList.remove("visible");
  if (DOM.quoteLine3) DOM.quoteLine3.classList.remove("visible");
  if (DOM.voiceListenIndicator) {
    DOM.voiceListenIndicator.classList.add("hidden");
    DOM.voiceListenIndicator.classList.remove("visible", "fade-out");
  }
  if (DOM.voiceBox) {
    DOM.voiceBox.classList.remove("playing", "voice-box-fade-out");
    DOM.voiceBox.classList.add("hidden");
  }
  if (DOM.finalCreditBlock) {
    DOM.finalCreditBlock.classList.add("hidden");
    DOM.finalCreditBlock.classList.remove("visible");
  }
  if (DOM.replayBlock) {
    DOM.replayBlock.classList.add("hidden");
    DOM.replayBlock.classList.remove("visible");
  }

  // 1. Show "Before you go..." whispered transition
  setTimeout(() => {
    if (DOM.finalWhisperBox) {
      DOM.finalWhisperBox.classList.add("fade-out");
      setTimeout(() => DOM.finalWhisperBox.classList.add("hidden"), 800);
    }

    // 2. Intimate Header softly fades in
    setTimeout(() => {
      if (DOM.finalHeader) {
        DOM.finalHeader.classList.remove("hidden");
        DOM.finalHeader.classList.add("visible");
      }

      // 3. Staggered reveal of the final quote
      setTimeout(() => {
        if (DOM.quoteLine1) DOM.quoteLine1.classList.add("visible");
      }, 700);

      setTimeout(() => {
        if (DOM.quoteLine2) DOM.quoteLine2.classList.add("visible");
      }, 2300);

      setTimeout(() => {
        if (DOM.quoteLine3) DOM.quoteLine3.classList.add("visible");
      }, 4000);

      // 4. Subtle "Listen..." prompt
      setTimeout(() => {
        if (DOM.voiceListenIndicator) {
          DOM.voiceListenIndicator.classList.remove("hidden");
          DOM.voiceListenIndicator.classList.add("visible");
        }

        // 5. Reveal voice note player and play real voice recording
        setTimeout(() => {
          if (DOM.voiceBox) {
            DOM.voiceBox.classList.remove("hidden");
          }
          playVoiceNote();
        }, 1400);

      }, 6200);

    }, 600);

  }, 2200);
}

function playVoiceNote() {
  if (!DOM.voiceNote) return;

  // Gently duck background music volume so Sagu's voice is crisp and clear
  if (DOM.bgMusic && !DOM.bgMusic.paused) {
    let vol = DOM.bgMusic.volume;
    const fadeAudio = setInterval(() => {
      if (vol > 0.08) {
        vol = Math.max(0.08, vol - 0.04);
        DOM.bgMusic.volume = vol;
      } else {
        clearInterval(fadeAudio);
      }
    }, 120);
  }

  DOM.voiceBox.classList.add("playing");
  DOM.voiceStatus.textContent = "Playing Personal Voice Note... 🎙️";

  const playPromise = DOM.voiceNote.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        STATE.isVoicePlaying = true;
      })
      .catch((err) => {
        console.log("Voice note notice: Playback ready once final-voice.mp3 is added.");
        DOM.voiceStatus.textContent = "Voice Note Ready";
        DOM.voiceBox.classList.remove("playing");
        if (DOM.voicePlaceholderNotice) {
          DOM.voicePlaceholderNotice.classList.remove("hidden");
        }
        setTimeout(() => {
          finishVoiceNote();
        }, 3500);
      });
  }
}

function replayVoiceNote() {
  if (DOM.voiceNote) {
    DOM.voiceNote.currentTime = 0;
    playVoiceNote();
  }
}

function finishVoiceNote() {
  STATE.isVoicePlaying = false;
  DOM.voiceBox.classList.remove("playing");
  DOM.voiceStatus.textContent = "Voice Note Complete ❤️";
  DOM.voiceProgressBar.style.width = "100%";

  // Fade visualizer away smoothly
  setTimeout(() => {
    DOM.voiceBox.classList.add("voice-box-fade-out");
    if (DOM.voiceListenIndicator) {
      DOM.voiceListenIndicator.classList.add("fade-out");
    }

    setTimeout(() => {
      DOM.voiceBox.classList.add("hidden");
      if (DOM.voiceListenIndicator) DOM.voiceListenIndicator.classList.add("hidden");

      // Show final emotional moment: "Made by your very own best friend, Sagu... ❤️"
      if (DOM.finalCreditBlock) {
        DOM.finalCreditBlock.classList.remove("hidden");
        DOM.finalCreditBlock.classList.add("visible");
      }

      // Restore background music volume gently
      if (DOM.bgMusic && !DOM.bgMusic.paused) {
        let vol = DOM.bgMusic.volume;
        const restoreAudio = setInterval(() => {
          if (vol < 0.55) {
            vol = Math.min(0.55, vol + 0.04);
            DOM.bgMusic.volume = vol;
          } else {
            clearInterval(restoreAudio);
          }
        }, 150);
      }

      // Screen remains quiet for a few seconds, then reveal subtle replay button
      setTimeout(() => {
        if (DOM.replayBlock) {
          DOM.replayBlock.classList.remove("hidden");
          DOM.replayBlock.classList.add("visible");
        }
      }, 4500);

    }, 800);

  }, 1000);
}

// ---------------------------------------------------------------------------
// 10B. REPLAY / EXPERIENCE RESTART
// ---------------------------------------------------------------------------
function resetAndRestartExperience() {
  // 1. Stop audio & voice note
  if (DOM.bgMusic) {
    DOM.bgMusic.pause();
    DOM.bgMusic.currentTime = 0;
    DOM.bgMusic.volume = 0.65;
  }
  if (DOM.voiceNote) {
    DOM.voiceNote.pause();
    DOM.voiceNote.currentTime = 0;
  }
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }

  // 2. Reset Global State
  STATE.isMusicPlaying = false;
  STATE.isVoicePlaying = false;
  STATE.verificationStep = 0;
  STATE.currentPhotoIndex = 0;
  isVerifying = false;

  // 3. Reset Music Widget
  if (DOM.musicWidget) DOM.musicWidget.classList.add("hidden");
  updateMusicWidgetState();

  // 4. Reset Voice Player & Final Stage elements
  if (DOM.voiceBox) {
    DOM.voiceBox.classList.remove("playing", "voice-box-fade-out");
    DOM.voiceBox.classList.add("hidden");
  }
  if (DOM.voiceProgressBar) DOM.voiceProgressBar.style.width = "0%";
  if (DOM.voiceListenIndicator) {
    DOM.voiceListenIndicator.classList.remove("visible", "fade-out");
    DOM.voiceListenIndicator.classList.add("hidden");
  }
  if (DOM.finalWhisperBox) {
    DOM.finalWhisperBox.classList.remove("visible", "fade-out");
    DOM.finalWhisperBox.classList.add("hidden");
  }
  if (DOM.finalHeader) {
    DOM.finalHeader.classList.remove("visible");
    DOM.finalHeader.classList.add("hidden");
  }
  if (DOM.quoteLine1) DOM.quoteLine1.classList.remove("visible");
  if (DOM.quoteLine2) DOM.quoteLine2.classList.remove("visible");
  if (DOM.quoteLine3) DOM.quoteLine3.classList.remove("visible");
  if (DOM.finalCreditBlock) {
    DOM.finalCreditBlock.classList.remove("visible");
    DOM.finalCreditBlock.classList.add("hidden");
  }
  if (DOM.replayBlock) {
    DOM.replayBlock.classList.remove("visible");
    DOM.replayBlock.classList.add("hidden");
  }

  // 5. Reset Open Surprise button
  if (DOM.openSurpriseBtn) {
    DOM.openSurpriseBtn.classList.remove("btn-pressed-transition");
  }

  // 6. Reset Gallery slideshow
  showPhoto(0);

  // 7. Reset Terminal Verification
  if (DOM.terminalBootLines) DOM.terminalBootLines.innerHTML = "";
  if (DOM.verificationBox) DOM.verificationBox.classList.add("hidden");
  if (DOM.verifyMomentBadge) {
    DOM.verifyMomentBadge.classList.remove("visible");
    DOM.verifyMomentBadge.classList.add("hidden");
  }
  if (DOM.questionContent) {
    DOM.questionContent.classList.remove("question-blur-exit", "question-slide-enter", "question-slide-enter-active");
  }
  if (DOM.verifyInput) {
    DOM.verifyInput.disabled = false;
    DOM.verifyInput.value = "";
  }
  if (DOM.verifySubmitBtn) DOM.verifySubmitBtn.disabled = false;
  if (DOM.verifyFeedback) {
    DOM.verifyFeedback.textContent = "";
    DOM.verifyFeedback.className = "verify-feedback";
  }

  // 8. Return to Stage 1: Terminal
  switchStage("terminal");

  // 9. Re-run boot sequence
  runTerminalBootSequence();
}

// ---------------------------------------------------------------------------
// 11. CONFETTI & CELEBRATION PARTICLES
// ---------------------------------------------------------------------------
function spawnConfettiBurst() {
  if (window.burstConfetti) {
    window.burstConfetti();
  }
}

// ---------------------------------------------------------------------------
// 12. CANVAS PARTICLE SYSTEM (Terminal stars -> Warm Stardust -> Peaceful Night)
// ---------------------------------------------------------------------------
function initCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles.forEach(p => {
      if (p.x > width) p.x = Math.random() * width;
      if (p.y > height) p.y = Math.random() * height;
    });
  });

  const particles = [];
  // Balanced sparse elegance: covers entire viewport including left & right sides without crowding
  const particleCount = Math.min(130, Math.max(65, Math.floor(window.innerWidth / 16)));

  let stageMode = "terminal"; // terminal, nightsky

  window.setCanvasStage = function (stage) {
    if (stage === "terminal") {
      stageMode = "terminal";
    } else {
      // All post-verification sections (access, reveal, gallery, letter, final) share the continuous starry night sky
      stageMode = "nightsky";
    }
  };

  class Star {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() < 0.5 ? 0 : height);

      // Star size distribution: delicate pinpricks, medium starlight, few bright stars
      const sizeRand = Math.random();
      if (sizeRand < 0.65) {
        this.size = Math.random() * 0.7 + 0.6; // 0.6px - 1.3px (delicate pinprick)
      } else if (sizeRand < 0.90) {
        this.size = Math.random() * 0.8 + 1.2; // 1.2px - 2.0px (medium starlight)
      } else {
        this.size = Math.random() * 0.8 + 2.0; // 2.0px - 2.8px (bright accent star)
      }

      // Exact color balance: ~55% white, ~28% celestial blue, ~10% purple, ~7% pink
      const colorRand = Math.random();
      if (colorRand < 0.55) {
        this.color = "#ffffff";
        this.haloColor = "rgba(255, 255, 255, ";
      } else if (colorRand < 0.83) {
        const blues = ["#93c5fd", "#60a5fa", "#7dd3fc", "#bfdbfe"];
        this.color = blues[Math.floor(Math.random() * blues.length)];
        this.haloColor = "rgba(96, 165, 250, ";
      } else if (colorRand < 0.93) {
        const purples = ["#c084fc", "#d8b4fe", "#e9d5ff"];
        this.color = purples[Math.floor(Math.random() * purples.length)];
        this.haloColor = "rgba(192, 132, 252, ";
      } else {
        const pinks = ["#f472b6", "#fbcfe8", "#fda4af"];
        this.color = pinks[Math.floor(Math.random() * pinks.length)];
        this.haloColor = "rgba(244, 114, 182, ";
      }

      // Drift velocity: extremely calm and gentle (25% pure static stars)
      const isStatic = Math.random() < 0.25;
      if (isStatic) {
        this.vx = 0;
        this.vy = 0;
      } else {
        this.vx = (Math.random() - 0.5) * 0.16;
        this.vy = (Math.random() - 0.5) * 0.16;
      }

      // Gentle twinkle behavior: 20% steady stars, others softly breathing
      const isSteadyTwinkle = Math.random() < 0.20;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = isSteadyTwinkle ? 0 : (Math.random() * 0.018 + 0.006);
      this.baseAlpha = Math.random() * 0.4 + 0.45; // 0.45 to 0.85
      this.alpha = this.baseAlpha;
      this.isAccent = this.size > 1.8 && Math.random() < 0.6;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      if (this.twinkleSpeed > 0) {
        this.twinklePhase += this.twinkleSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.twinklePhase) * 0.35;
      }
      if (this.alpha < 0.18) this.alpha = 0.18;
      if (this.alpha > 1) this.alpha = 1;
    }

    draw(offsetX = 0, offsetY = 0) {
      ctx.save();
      ctx.globalAlpha = this.alpha;

      const px = this.x + offsetX;
      const py = this.y + offsetY;

      if (stageMode === "terminal") {
        // Digital cyber dust for terminal mode
        ctx.fillStyle = this.twinklePhase % 2 > 1 ? "#38bdf8" : "#93c5fd";
        ctx.beginPath();
        ctx.arc(px, py, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Deep blue night-sky stars (tiny white, blue, subtle pink/purple)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(px, py, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle soft diffraction halo on prominent accent stars
        if (this.isAccent && this.alpha > 0.62) {
          ctx.beginPath();
          ctx.fillStyle = this.haloColor + (this.alpha * 0.22) + ")";
          ctx.arc(px, py, this.size * 2.6, 0, Math.PI * 2);
          ctx.fill();

          // Delicate 4-point cross shimmer when shining brightly
          if (this.alpha > 0.82) {
            ctx.strokeStyle = this.haloColor + (this.alpha * 0.45) + ")";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(px - this.size * 2.2, py);
            ctx.lineTo(px + this.size * 2.2, py);
            ctx.moveTo(px, py - this.size * 2.2);
            ctx.lineTo(px, py + this.size * 2.2);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Star());
  }

  // Subtle Parallax tracking (extremely gentle, calm living feel)
  let targetParallaxX = 0;
  let targetParallaxY = 0;
  let parallaxX = 0;
  let parallaxY = 0;

  window.addEventListener("mousemove", (e) => {
    targetParallaxX = (e.clientX - width / 2) * 0.01;
    targetParallaxY = (e.clientY - height / 2) * 0.01;
  }, { passive: true });

  // Confetti burst particles (Subtle, non-excessive for birthday reveal)
  const confettiList = [];
  window.burstConfetti = function () {
    const colors = ["#f472b6", "#60a5fa", "#38bdf8", "#fbbf24", "#ffffff", "#c084fc"];
    for (let i = 0; i < 32; i++) {
      confettiList.push({
        x: width / 2,
        y: height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.7) * 9,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6,
        alpha: 1,
        gravity: 0.22
      });
    }
  };

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Smooth living parallax
    parallaxX += (targetParallaxX - parallaxX) * 0.035;
    parallaxY += (targetParallaxY - parallaxY) * 0.035;

    // Update & draw background particles with subtle parallax
    particles.forEach(p => {
      p.update();
      p.draw(parallaxX * (p.size / 1.5), parallaxY * (p.size / 1.5));
    });

    // Update & draw subtle confetti
    for (let i = confettiList.length - 1; i >= 0; i--) {
      const c = confettiList[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.vx *= 0.98;
      c.rotation += c.rotationSpeed;
      c.alpha -= 0.014;

      if (c.alpha <= 0) {
        confettiList.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = c.alpha;
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ---------------------------------------------------------------------------
// 13. EVENT LISTENERS
// ---------------------------------------------------------------------------
function setupEventListeners() {
  // Verification submit handlers (Enter key, Button click, Form submit)
  if (DOM.verifyForm) {
    DOM.verifyForm.addEventListener("submit", handleVerification);
  }

  if (DOM.verifySubmitBtn) {
    DOM.verifySubmitBtn.addEventListener("click", handleVerification);
  }

  if (DOM.verifyInput) {
    DOM.verifyInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        handleVerification(e);
      }
    });
  }

  // Open Surprise
  if (DOM.openSurpriseBtn) {
    DOM.openSurpriseBtn.addEventListener("click", handleOpenSurprise);
  }

  // Explore Memories
  if (DOM.exploreMemoriesBtn) {
    DOM.exploreMemoriesBtn.addEventListener("click", () => {
      switchStage("gallery");
    });
  }

  // Gallery Navigation
  if (DOM.galleryNextBtn) {
    DOM.galleryNextBtn.addEventListener("click", nextPhoto);
  }
  if (DOM.galleryPrevBtn) {
    DOM.galleryPrevBtn.addEventListener("click", prevPhoto);
  }

  // Go to Letter (Cinematic Chapter Transition with Emotional Interlude)
  if (DOM.gotoLetterBtn) {
    DOM.gotoLetterBtn.addEventListener("click", transitionToLetterStage);
  }

  // Go to Final
  if (DOM.gotoFinalBtn) {
    DOM.gotoFinalBtn.addEventListener("click", () => {
      startFinalSequence();
    });
  }

  // Music toggle (Mute / Unmute)
  if (DOM.musicToggleBtn) {
    DOM.musicToggleBtn.addEventListener("click", toggleBackgroundMusic);
  }

  // Voice replay
  if (DOM.voiceReplayBtn) {
    DOM.voiceReplayBtn.addEventListener("click", replayVoiceNote);
  }

  // Experience Replay button
  if (DOM.replayBtn) {
    DOM.replayBtn.addEventListener("click", resetAndRestartExperience);
  }
}

// Cinematic Transition into the Personal Letter Scrapbook Stage
function transitionToLetterStage() {
  if (DOM.galleryStage) {
    DOM.galleryStage.classList.add("stage-exiting");
  }

  if (window.setCanvasStage) {
    window.setCanvasStage("letter");
  }

  setTimeout(() => {
    if (DOM.galleryStage) {
      DOM.galleryStage.classList.remove("stage-exiting");
    }
    switchStage("letter");

    // Short emotional interlude: "There's something I've wanted to say..."
    if (DOM.letterPreTransition && DOM.letterMainContent) {
      DOM.letterMainContent.classList.add("hidden");
      DOM.letterPreTransition.classList.remove("hidden");
      void DOM.letterPreTransition.offsetWidth;
      DOM.letterPreTransition.classList.add("visible");

      setTimeout(() => {
        DOM.letterPreTransition.classList.remove("visible");
        DOM.letterPreTransition.classList.add("fade-out");

        setTimeout(() => {
          DOM.letterPreTransition.classList.add("hidden");
          DOM.letterPreTransition.classList.remove("fade-out");
          DOM.letterMainContent.classList.remove("hidden");
          DOM.letterMainContent.classList.add("fade-in");
        }, 500);
      }, 1600);
    }
  }, 500);
}
