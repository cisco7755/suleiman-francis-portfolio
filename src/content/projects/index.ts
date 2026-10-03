import type { Project } from '../types';
import { clientshot } from './clientshot';
import { clientshotPublic } from './clientshot-public';
import { deviceIntelligence } from './device-intelligence';
import { elsrt } from './elsrt';
import { seamhealthBlog } from './seamhealth-blog';
import { whistlerAdmin } from './whistler-admin';
import { whistlerMobile } from './whistler-mobile';
import { whistlerWeb } from './whistler-web';

/**
 * Every case study, in display order. One file per project; facts in each are
 * verified against its repository (see the comment at the top of each file).
 */
export const projects: Project[] = [
  whistlerMobile,
  clientshot,
  whistlerWeb,
  deviceIntelligence,
  whistlerAdmin,
  clientshotPublic,
  seamhealthBlog,
  elsrt,
];

export const featuredProjects = projects.filter((project) => project.featured);
export const moreProjects = projects.filter((project) => !project.featured);
