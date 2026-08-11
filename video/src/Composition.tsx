import React from "react";
import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

const INK = "#0A0A0A";
const PAPER = "#FFFFFF";
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const editorialEase = Easing.bezier(0.45, 0, 0.55, 1);

const BeatFade = ({
  duration,
  children,
  fadeIn = 28,
  fadeOut = 20,
}: {
  duration: number;
  children: React.ReactNode;
  fadeIn?: number;
  fadeOut?: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: PAPER}}>
      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [0, fadeIn, duration - fadeOut, duration], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: editorialEase,
          }),
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BrandMark = ({inverse = false, size = 56}: {inverse?: boolean; size?: number}) => (
  <Img
    alt=""
    src={staticFile("assets/brand-iustitia-256.png")}
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: inverse ? "brightness(0) invert(1)" : "none",
    }}
  />
);

const Brand = ({inverse = false, compact = false}: {inverse?: boolean; compact?: boolean}) => (
  <div className={"brand " + (compact ? "brand-compact" : "")} style={{color: inverse ? PAPER : INK}}>
    <BrandMark inverse={inverse} size={compact ? 30 : 42}/>
    <span>Served</span>
  </div>
);

const OpenAIWordmark = () => (
  <Img alt="OpenAI" className="openai-wordmark" src={staticFile("assets/openai-wordmark.png")}/>
);

const ModelPill = ({label}: {label: string}) => (
  <div className="model-pill">
    <OpenAIWordmark/>
    <span>{label}</span>
  </div>
);

const RestaurantSketch = ({muted = false, animated = false}: {muted?: boolean; animated?: boolean}) => {
  const frame = useCurrentFrame();
  const reveal = (from: number, to: number) => animated
    ? interpolate(frame, [from, to], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: ease,
      })
    : 1;
  const ground = reveal(4, 42);
  const shell = reveal(16, 66);
  const roof = reveal(38, 88);
  const details = reveal(66, 118);
  const lettering = reveal(92, 142);
  const openSign = reveal(110, 154);
  const breathe = animated ? Math.sin(frame / 22) : 0;

  return (
    <svg className="restaurant-sketch" viewBox="0 0 820 390" fill="none" aria-hidden="true" style={{opacity: muted ? 0.12 : 1}}>
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M112 318H708"
          pathLength={1}
          style={{strokeDasharray: 1, strokeDashoffset: 1 - ground}}
        />
        <g style={{opacity: shell, translate: `0px ${20 * (1 - shell)}px`}}>
          <path d="M166 310V139H654V310"/>
          <path d="M146 139H674L637 82H183L146 139Z"/>
        </g>
        <g style={{opacity: roof, translate: `0px ${-14 * (1 - roof)}px`}}>
          <path d="M183 139v41c0 18 15 33 33 33s33-15 33-33v-41"/>
          <path d="M249 139v41c0 18 15 33 33 33s33-15 33-33v-41"/>
          <path d="M315 139v41c0 18 15 33 33 33s33-15 33-33v-41"/>
          <path d="M381 139v41c0 18 15 33 33 33s33-15 33-33v-41"/>
          <path d="M447 139v41c0 18 15 33 33 33s33-15 33-33v-41"/>
          <path d="M513 139v41c0 18 15 33 33 33s33-15 33-33v-41"/>
          <path d="M579 139v41c0 18 15 33 33 33s33-15 33-33v-41"/>
        </g>
        <g style={{opacity: details, scale: 0.96 + details * 0.04, transformOrigin: "410px 280px"}}>
          <rect x="222" y="232" width="112" height="78" rx="3"/>
          <rect x="493" y="232" width="112" height="78" rx="3"/>
          <path d="M378 310v-92h72v92"/>
          <circle cx="430" cy="265" r="3" fill="currentColor" strokeWidth="0"/>
          <path d="M271 251h14M542 251h14"/>
        </g>
        <g style={{opacity: openSign, rotate: `${breathe * 1.4}deg`, transformOrigin: "550px 275px"}}>
          <path d="M542 253v12"/>
          <rect x="518" y="265" width="64" height="28" rx="3" fill={PAPER}/>
        </g>
      </g>
      <text x="550" y="284" textAnchor="middle" fill="currentColor" fontFamily="IBM Plex Sans, Arial" fontSize="14" fontWeight="700" letterSpacing="2" style={{opacity: openSign}}>OPEN</text>
      <text x="410" y="120" textAnchor="middle" fill="currentColor" fontFamily="IBM Plex Sans, Arial" fontSize="27" fontWeight="700" letterSpacing="7" style={{opacity: lettering}}>RAUL&apos;S</text>
      <text x="410" y="352" textAnchor="middle" fill="currentColor" fontFamily="IBM Plex Sans, Arial" fontSize="17" fontWeight="600" letterSpacing="3.4" style={{opacity: lettering}}>SMALL RESTAURANT · BUILT ONE DAY AT A TIME</text>
    </svg>
  );
};

const EnvelopeSketch = () => (
  <svg className="envelope-sketch" viewBox="0 0 340 230" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="25" width="304" height="180" rx="14"/>
      <path d="m31 48 139 101L309 48"/>
      <path d="m31 190 101-83M309 190l-101-83"/>
    </g>
    <circle cx="170" cy="176" r="20" fill={PAPER} stroke={INK} strokeWidth="4"/>
    <path d="m160 176 7 7 14-16" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RaulFigure = () => (
  <svg className="raul-figure" viewBox="0 0 300 430" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="150" cy="70" r="48"/>
      <path d="M127 70h2M171 70h2"/>
      <path d="M134 92c10 7 22 7 32 0"/>
      <path d="M90 380 104 155c2-28 23-45 46-45s44 17 46 45l14 225"/>
      <path d="M111 179c20 12 58 12 78 0"/>
      <path d="M104 205 57 259M196 205l47 54"/>
      <rect x="94" y="240" width="112" height="83" rx="7" fill={PAPER}/>
      <path d="m105 253 45 34 45-34"/>
    </g>
  </svg>
);

const PhoneSketch = () => (
  <svg className="phone-sketch" viewBox="0 0 240 210" fill="none" aria-hidden="true">
    <path d="M42 105c-9-19-6-41 8-57l24-24c7-7 19-5 24 4l12 23c4 8 2 17-5 22L91 84c17 25 40 45 68 58l10-15c5-7 15-10 23-6l23 11c10 5 12 18 4 25l-23 21c-15 14-37 18-56 10-44-18-80-47-98-83Z" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RestaurantBeat = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill className="story-canvas">
      <div className="restaurant-wrap" style={{
        opacity: interpolate(frame, [0, 26], [0, 1], {extrapolateRight: "clamp", easing: ease}),
        scale: interpolate(frame, [0, 72, 190], [0.93, 1, 1.012], {extrapolateRight: "clamp", easing: ease}),
        translate: interpolate(frame, [0, 72, 190], ["-50% 20px", "-50% 0px", "-50% -5px"], {extrapolateRight: "clamp", easing: editorialEase}),
      }}><RestaurantSketch animated/></div>
      <div className="story-copy bottom-copy">
        <span style={{opacity: interpolate(frame, [92, 134], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase})}}>A SMALL BUSINESS STORY</span>
        <h1 style={{
          opacity: interpolate(frame, [112, 122], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
          translate: interpolate(frame, [112, 172], ["0px 14px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
        }}>Raul&apos;s restaurant<br/><em>is already struggling.</em></h1>
      </div>
    </AbsoluteFill>
  );
};

const PressureBeat = () => {
  const frame = useCurrentFrame();
  const burdens = [
    {label: "PAYROLL DUE", from: 18, x: 180, y: 292},
    {label: "SUPPLIER INVOICE", from: 42, x: 1450, y: 336},
    {label: "SLOW WEEK", from: 66, x: 1410, y: 706},
  ];
  return (
    <AbsoluteFill className="story-canvas">
      <div className="restaurant-wrap compact-store" style={{
        scale: interpolate(frame, [0, 52, 138], [1.04, 1, 0.992], {extrapolateRight: "clamp", easing: editorialEase}),
        translate: interpolate(frame, [0, 52], ["-50% -10px", "-50% 0px"], {extrapolateRight: "clamp", easing: ease}),
      }}><RestaurantSketch/></div>
      {burdens.map((item) => <div key={item.label} className={"burden-tag " + (item.label === "PAYROLL DUE" ? "burden-primary" : "")} style={{
        left: item.x,
        top: item.y,
        opacity: interpolate(frame, [item.from, item.from + 18], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
        translate: interpolate(frame, [item.from, item.from + 24], ["0px 12px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
        rotate: interpolate(frame, [item.from, item.from + 24], [item.x < 900 ? "-3deg" : "3deg", "0deg"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
      }}>{item.label}</div>)}
      <div className="pressure-copy">
        <h2 style={{
          opacity: interpolate(frame, [8, 18], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
          translate: interpolate(frame, [8, 60], ["0px 12px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
        }}>Payroll is due.</h2>
        <p style={{
          opacity: interpolate(frame, [48, 58], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
          translate: interpolate(frame, [48, 102], ["0px 10px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
        }}>Every dollar matters.</p>
      </div>
    </AbsoluteFill>
  );
};

const LetterBeat = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill className="story-canvas letter-beat">
      <div className="restaurant-wrap compact-store" style={{
        opacity: interpolate(frame, [0, 62], [0.34, 0.12], {extrapolateRight: "clamp", easing: editorialEase}),
        scale: interpolate(frame, [0, 76], [1, 0.96], {extrapolateRight: "clamp", easing: editorialEase}),
      }}><RestaurantSketch/></div>
      <div className="letter-arrival" style={{
        opacity: interpolate(frame, [8, 32], [0, 1], {extrapolateRight: "clamp", easing: ease}),
        translate: interpolate(frame, [0, 54, 76], ["-50% -220px", "-50% 8px", "-50% 0px"], {extrapolateRight: "clamp", easing: ease}),
        rotate: interpolate(frame, [0, 54, 76], ["-7deg", "1.2deg", "0deg"], {extrapolateRight: "clamp", easing: ease}),
        scale: interpolate(frame, [0, 54, 76], [0.9, 1.025, 1], {extrapolateRight: "clamp", easing: ease}),
      }}>
        <EnvelopeSketch/>
        <span>FINANCIAL RECORDS SUBPOENA</span>
      </div>
      <div className="story-copy upper-copy">
        <span style={{opacity: interpolate(frame, [10, 50], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase})}}>THEN ONE MORNING</span>
        <h1 style={{
          opacity: interpolate(frame, [26, 36], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
          translate: interpolate(frame, [26, 84], ["0px 14px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
        }}>Raul is <em>served.</em></h1>
      </div>
    </AbsoluteFill>
  );
};

const QuestionChip = ({text, from, x, y}: {text: string; from: number; x: number; y: number}) => {
  const frame = useCurrentFrame();
  return <div className="question-chip" style={{
    left: x,
    top: y,
    opacity: interpolate(frame, [from, from + 18], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
    translate: interpolate(frame, [from, from + 30, from + 170], ["0px 22px", "0px 0px", `0px ${x < 900 ? -5 : 5}px`], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
    scale: interpolate(frame, [from, from + 34], [0.96, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
    rotate: interpolate(frame, [from, from + 36], [x < 900 ? "-1.5deg" : "1.5deg", "0deg"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
  }}>{text}</div>;
};

const QuestionsBeat = () => {
  const frame = useCurrentFrame();
  const questions = [
    {text: "What is this?", from: 24, x: 220, y: 235},
    {text: "Is it real?", from: 48, x: 1450, y: 226},
    {text: "What do they want?", from: 72, x: 180, y: 455},
    {text: "How much time do I have?", from: 96, x: 1390, y: 450},
    {text: "Do I need to call my bank?", from: 120, x: 162, y: 700},
    {text: "Can I afford a lawyer?", from: 144, x: 1418, y: 694},
    {text: "What happens if I get it wrong?", from: 168, x: 710, y: 865},
  ];
  return (
    <AbsoluteFill className="question-canvas">
      <div className="question-heading">
        <span style={{opacity: interpolate(frame, [4, 38], [0, 1], {extrapolateRight: "clamp", easing: editorialEase})}}>RAUL DOESN&apos;T KNOW WHAT TO DO</span>
        <h2 style={{
          opacity: interpolate(frame, [12, 22], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
          translate: interpolate(frame, [12, 64], ["0px 12px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
        }}>The letter arrived.<br/>The next step did not.</h2>
      </div>
      <div className="raul-wrap" style={{
        opacity: interpolate(frame, [0, 34], [0, 1], {extrapolateRight: "clamp", easing: ease}),
        translate: interpolate(frame, [0, 44, 250], ["-50% 24px", "-50% 0px", "-50% -4px"], {extrapolateRight: "clamp", easing: editorialEase}),
        scale: interpolate(frame, [0, 50], [0.96, 1], {extrapolateRight: "clamp", easing: ease}),
      }}><RaulFigure/></div>
      {questions.map((question) => <QuestionChip key={question.text} {...question}/>)}
    </AbsoluteFill>
  );
};

const SolutionBeat = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill className="solution-beat">
      <div style={{
        opacity: interpolate(frame, [0, 24], [0, 1], {extrapolateRight: "clamp", easing: ease}),
        scale: interpolate(frame, [0, 38], [0.84, 1], {extrapolateRight: "clamp", easing: ease}),
        rotate: interpolate(frame, [0, 38], ["-5deg", "0deg"], {extrapolateRight: "clamp", easing: ease}),
      }}><BrandMark size={94}/></div>
      <span style={{opacity: interpolate(frame, [22, 46], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease})}}>THE BURDEN GETS SMALLER</span>
      <h1 style={{
        opacity: interpolate(frame, [30, 40], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
        translate: interpolate(frame, [30, 72], ["0px 14px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
      }}>Served solves this.</h1>
      <p style={{opacity: interpolate(frame, [52, 82], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease})}}>A clear next step—without asking Raul to become a lawyer.</p>
    </AbsoluteFill>
  );
};

const FounderStatement = ({from, to, children}: {from: number; to: number; children: React.ReactNode}) => {
  const frame = useCurrentFrame();
  return <div className="founder-statement" style={{
    opacity: interpolate(frame, [from, from + 18, to - 18, to], [0, 1, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
    translate: interpolate(frame, [from, from + 24], ["0px 18px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
  }}>{children}</div>;
};

const FounderBeat = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill className="founder-beat">
    <div style={{
      opacity: interpolate(frame, [0, 30], [0, 1], {extrapolateRight: "clamp", easing: ease}),
      rotate: interpolate(frame, [0, 48, 620], ["-7deg", "0deg", "2deg"], {extrapolateRight: "clamp", easing: editorialEase}),
      translate: interpolate(frame, [0, 48], ["-20px 0px", "0px 0px"], {extrapolateRight: "clamp", easing: ease}),
    }}><PhoneSketch/></div>
    <FounderStatement from={0} to={120}><span>THIS PROBLEM IS PERSONAL</span><h2>I worked as a legal assistant<br/>in law offices for many years.</h2></FounderStatement>
    <FounderStatement from={110} to={320}><span>THE GAP I SAW</span><h2>For many law firms, these matters are simply too small<br/>to justify the time and cost of an attorney—<br/><em>and they won&apos;t take them.</em></h2></FounderStatement>
    <FounderStatement from={310} to={432}><span>THE OWNER IS STILL WAITING</span><h2>But owners like Raul just want to know:<br/><em>what do I do next?</em></h2></FounderStatement>
    <FounderStatement from={420} to={624}><span>EVEN WITH A LAWYER</span><h2>Even when an attorney reviews the document,<br/>much of the work still falls on you.</h2></FounderStatement>
  </AbsoluteFill>;
};

const WhyBuiltBeat = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill className="why-built-beat">
    <div style={{
      opacity: interpolate(frame, [0, 14], [0, 1], {extrapolateRight: "clamp", easing: ease}),
      scale: interpolate(frame, [0, 24], [0.88, 1], {extrapolateRight: "clamp", easing: ease}),
    }}><BrandMark size={82}/></div>
    <span style={{opacity: interpolate(frame, [6, 24], [0, 1], {extrapolateRight: "clamp", easing: ease})}}>A BETTER NEXT STEP</span>
    <h1 style={{
      opacity: interpolate(frame, [8, 18], [0, 1], {extrapolateRight: "clamp", easing: editorialEase}),
      translate: interpolate(frame, [8, 34], ["0px 12px", "0px 0px"], {extrapolateRight: "clamp", easing: editorialEase}),
    }}>That&apos;s why we built <em>Served.</em></h1>
  </AbsoluteFill>;
};

const CapabilityRow = ({
  from,
  eyebrow,
  title,
  detail,
}: {
  from: number;
  eyebrow: string;
  title: string;
  detail: string;
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [from, from + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return <div className="capability-row" style={{opacity: enter, translate: `${18 * (1 - enter)}px 0px`}}>
    <div className="capability-check">✓</div>
    <span>{eyebrow}</span>
    <strong>{title}</strong>
    <small>{detail}</small>
  </div>;
};

const ResponseWorkflowBeat = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill className="response-workflow-beat">
    <div className="response-workflow-brand"><Brand compact/></div>
    <div className="response-workflow-heading">
      <span>WHAT SERVED DOES</span>
      <h2>From confusing request<br/>to a clear response.</h2>
    </div>
    <div className="capability-stack">
      <CapabilityRow from={4} eyebrow="VERIFY" title="Checks the legal request" detail="Public source evidence stays separate from the uploaded document."/>
      <CapabilityRow from={38} eyebrow="EXPLAIN" title="Translates it into plain English" detail="GPT-5.6 explains the request without changing the code-decided result."/>
      <CapabilityRow from={78} eyebrow="FLAG" title="Flags suspicious or fraudulent documents" detail="Only supported warning signs count; uncertainty fails safely."/>
      <CapabilityRow from={138} eyebrow="GUIDE" title="Guides the full response workflow" detail="Court checks, Plaid Sandbox records, and review stay in one controlled flow."/>
    </div>
    <div className="capability-tech" style={{opacity: interpolate(frame, [150, 178], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease})}}>
      <ModelPill label="GPT-5.6 · RESPONSES API"/>
      <span>COURTLISTENER</span><i>+</i><span>PLAID SANDBOX</span>
    </div>
  </AbsoluteFill>;
};

const HumanReviewBeat = () => {
  const frame = useCurrentFrame();
  const actions = ["READ", "CHECK", "EXPLAIN"];
  return <AbsoluteFill className="human-review-beat">
    <div className="human-review-copy">
      <span>ONE CORE PRINCIPLE</span>
      <h2>Human in the loop.</h2>
    </div>
    <div className="human-review-flow">
      <div className="agent-actions">
        <div className="agent-actions-head"><OpenAIWordmark/><b>GPT-5.6</b></div>
        <div className="action-row">
          {actions.map((action, index) => <span key={action} style={{
            opacity: interpolate(frame, [28 + index * 18, 44 + index * 18], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
          }}>{action}</span>)}
        </div>
      </div>
      <div className="review-arrow" style={{opacity: interpolate(frame, [70, 92], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease})}}>→</div>
      <div className="raul-approval" style={{
        opacity: interpolate(frame, [82, 108], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
        scale: interpolate(frame, [82, 108], [0.96, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
      }}><span>FINAL CONTROL</span><b>RAUL APPROVES</b><small>Include · Keep out · Ask for help</small></div>
    </div>
    <div className="human-promise" style={{
      opacity: interpolate(frame, [112, 140], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
      translate: interpolate(frame, [112, 144], ["0px 12px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}),
    }}><BrandMark size={34}/><strong>Nothing is sent without your approval.</strong></div>
  </AbsoluteFill>;
};

const MissionBeat = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill className="mission-beat">
    <BrandMark size={68}/>
    <span style={{opacity: interpolate(frame, [4, 24], [0, 1], {extrapolateRight: "clamp", easing: ease})}}>WHAT WE BELIEVE</span>
    <h2 style={{
      opacity: interpolate(frame, [10, 20], [0, 1], {extrapolateRight: "clamp", easing: editorialEase}),
      translate: interpolate(frame, [10, 42], ["0px 14px", "0px 0px"], {extrapolateRight: "clamp", easing: editorialEase}),
    }}>No small-business owner should face<br/>legal paperwork alone.</h2>
  </AbsoluteFill>;
};

const TaglineBeat = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill className="tagline-beat">
    <div className="tagline-first" style={{
      opacity: interpolate(frame, [0, 14, 58, 76], [0, 1, 1, 0.18], {extrapolateRight: "clamp", easing: editorialEase}),
    }}>You&apos;ve been served.</div>
    <div className="tagline-second" style={{
      opacity: interpolate(frame, [58, 74], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
      translate: interpolate(frame, [58, 98], ["0px 16px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: editorialEase}),
    }}>Now, you&apos;re <em>Served by us.</em></div>
  </AbsoluteFill>;
};

const HandoffBeat = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill className="handoff-beat">
    <BrandMark size={70}/>
    <span>HANDING IT OVER TO MY TEAMMATE</span>
    <h2 style={{
      opacity: interpolate(frame, [4, 16], [0, 1], {extrapolateRight: "clamp", easing: editorialEase}),
      translate: interpolate(frame, [4, 42], ["0px 12px", "0px 0px"], {extrapolateRight: "clamp", easing: editorialEase}),
    }}>Now, let us show you<br/>how Served works.</h2>
    <div className="demo-cue" style={{opacity: interpolate(frame, [42, 68], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease})}}>LIVE DEMO <span>→</span></div>
    <div className="technology-credit"><OpenAIWordmark/><span>GPT-5.6 via the Responses API · Built with Codex</span></div>
  </AbsoluteFill>;
};

export const ServedStory = () => (
  <AbsoluteFill style={{backgroundColor: PAPER}}>
    <Sequence name="Background music" durationInFrames={2437}>
      <Audio
        src={staticFile("audio/inspiring-cinematic-bg.mp3")}
        trimBefore={90}
        trimAfter={2527}
        volume={(frame) => interpolate(
          frame,
          [0, 30, 870, 930, 2377, 2437],
          [0, 0.17, 0.17, 0.07, 0.07, 0],
          {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
        )}
      />
    </Sequence>
    <Sequence name="Founder voiceover" from={930} durationInFrames={1507}>
      <Audio src={staticFile("audio/founder-personal-0721.mp3")}/>
    </Sequence>
    <Sequence name="Raul's restaurant" durationInFrames={210}><BeatFade duration={210}><RestaurantBeat/></BeatFade></Sequence>
    <Sequence name="A hard month" from={210} durationInFrames={150}><BeatFade duration={150}><PressureBeat/></BeatFade></Sequence>
    <Sequence name="The letter arrives" from={360} durationInFrames={180}><BeatFade duration={180}><LetterBeat/></BeatFade></Sequence>
    <Sequence name="Raul's questions" from={540} durationInFrames={270}><BeatFade duration={270}><QuestionsBeat/></BeatFade></Sequence>
    <Sequence name="Served solves this" from={810} durationInFrames={120}><BeatFade duration={120}><SolutionBeat/></BeatFade></Sequence>
    <Sequence name="Founder connection" from={930} durationInFrames={624}><BeatFade duration={624} fadeIn={10} fadeOut={10}><FounderBeat/></BeatFade></Sequence>
    <Sequence name="Why we built Served" from={1554} durationInFrames={73}><BeatFade duration={73} fadeIn={10} fadeOut={10}><WhyBuiltBeat/></BeatFade></Sequence>
    <Sequence name="What Served does" from={1627} durationInFrames={238}><BeatFade duration={238} fadeIn={10} fadeOut={10}><ResponseWorkflowBeat/></BeatFade></Sequence>
    <Sequence name="Human in the loop" from={1865} durationInFrames={193}><BeatFade duration={193} fadeIn={10} fadeOut={10}><HumanReviewBeat/></BeatFade></Sequence>
    <Sequence name="Our belief" from={2058} durationInFrames={131}><BeatFade duration={131} fadeIn={10} fadeOut={10}><MissionBeat/></BeatFade></Sequence>
    <Sequence name="Served by us" from={2189} durationInFrames={126}><BeatFade duration={126} fadeIn={10} fadeOut={10}><TaglineBeat/></BeatFade></Sequence>
    <Sequence name="Demo handoff" from={2315} durationInFrames={122}><BeatFade duration={122} fadeIn={10} fadeOut={10}><HandoffBeat/></BeatFade></Sequence>
  </AbsoluteFill>
);

export const MyComposition = () => (
  <Composition id="Served-Raul-Story" component={ServedStory} durationInFrames={2437} fps={30} width={1920} height={1080}/>
);
