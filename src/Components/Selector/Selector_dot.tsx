import classNames from '@/utils/classNames';

import './Selector_dot.css';

const STATUSES_DICT = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange',
  alive: 'green',
  dead: 'red',
  unknown: 'orange',
};

export type StatusesType = keyof typeof STATUSES_DICT;

export interface IStatusProps {
  status?: StatusesType;
  classname?: string;
}

export const SelectorDot = (props: IStatusProps) => {
  const { status = 'Unknown', classname } = props;

  const statusValue = STATUSES_DICT[status];

  return statusValue ? (
    <div className={classNames(statusValue, classname)} />
  ) : null;
};
