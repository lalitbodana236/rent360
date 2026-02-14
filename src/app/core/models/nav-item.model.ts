import { AppFeatureKey } from '../constants/app-features';
import { UserRole } from '../services/auth.service';

export interface NavItemModel {
  label: string;
  route: string;
  roles?: UserRole[];
  permission?: string;
  feature?: AppFeatureKey;
}
