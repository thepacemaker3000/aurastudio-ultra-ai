import { PosePreset } from '../types';

export const POSE_PRESETS: PosePreset[] = [
  {
    id: 'pose-arms-crossed',
    title: 'Arms Crossed Power Stance',
    titleAr: 'وقفة الثقة والقيادة (طوي الذراعين)',
    description: 'Confident, authoritative posture with folded arms and subtle head tilt.',
    angle: 'Direct 3/4 Angle',
    vibe: 'Authoritative & Command Strength',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pose-ceo-lean-sitting',
    title: 'Sitting Executive Desk Lean',
    titleAr: 'الجلسة القيادية فوق المكتب',
    description: 'Relaxed yet commanding posture seated at desk, hands resting comfortably.',
    angle: 'Eye-level Frontal',
    vibe: 'Approachable Leader',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pose-warm-smile-frontal',
    title: 'Warm Engaging Confident Smile',
    titleAr: 'الابتسامة الدافئة والمباشرة',
    description: 'Direct eye contact with natural toothy or closed-lip warm smile.',
    angle: 'Direct Frontal',
    vibe: 'High Trust & Engagement',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pose-thoughtful-looking-off',
    title: 'Visionary Off-Camera Look',
    titleAr: 'نظرة مستقبلية بعيدة عن الكاميرا',
    description: 'Slight head turn looking thoughtfully off-camera into the light.',
    angle: '45-Degree Profile',
    vibe: 'Intellectual & Visionary',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pose-hands-in-pockets',
    title: 'Casual Hands in Pocket Stance',
    titleAr: 'وقفة عصرية أيدي في الجيوب',
    description: 'Standing erect with relaxed shoulders and hands loosely in jacket pockets.',
    angle: '3/4 Full Torso',
    vibe: 'Modern Tech & Creator',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  }
];
