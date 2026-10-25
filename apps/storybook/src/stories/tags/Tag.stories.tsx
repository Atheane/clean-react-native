import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Colors, Tag } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const TagMeta: ComponentMeta<typeof Tag> = {
  title: 'Tags/Tag',
  component: Tag,
  args: {
    text: 'Non calculé',
    color: Colors.bank.primary.lightGrey,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default TagMeta;

export const TwoColumns: ComponentStory<typeof Tag> = (args) => {
  return <Tag {...args} />;
};
