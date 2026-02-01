export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ProposalProps {
  onAccept: () => void;
  name?: string;
}

export interface WelcomeProps {
  onStart: () => void;
}

export interface SuccessProps {
  whatsappNumber?: string; // Optional: Pre-fill specific number if needed, otherwise generic share
}