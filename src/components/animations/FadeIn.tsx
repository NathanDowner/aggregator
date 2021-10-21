import { Transition } from '@headlessui/react';

type Props = {
  reveal: boolean;
};

const FadeIn: React.FC<Props> = ({ children, reveal }) => {
  return (
    <Transition
      show={reveal}
      enter="transition-opacity"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};

export default FadeIn;
