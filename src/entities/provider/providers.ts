import Social from '../social.entity';
import UserMeta from '../user-meta.entity';
import { User } from '../user.entity';

export const PROVIDERS = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
  {
    provide: 'USER_META_REPOSITORY',
    useValue: UserMeta,
  },
  {
    provide: 'SOCIAL_REPOSITORY',
    useValue: Social,
  },
];
