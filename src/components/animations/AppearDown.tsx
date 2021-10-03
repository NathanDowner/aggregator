import { Transition } from '@headlessui/react';

type Props = {
  reveal: boolean;
};

const AppearDown: React.FC<Props> = ({ children, reveal }) => {
  return (
    <Transition
      show={reveal}
      enter="transition duration-100 ease-out"
      enterFrom="transform -translate-y-2 opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform -translate-y-2 opacity-0"
    >
      {children}
    </Transition>
  );
};

export default AppearDown;
