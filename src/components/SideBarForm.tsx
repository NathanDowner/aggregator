type SideBarFormProps = {
  onSubmit: () => void;
};

const SideBarForm = ({ onSubmit }: SideBarFormProps) => {
  return (
    <form className="mt-2 p-2 bg-gray-100 rounded-md">
      <div className="form-group">
        <label htmlFor="name" className="text-sm mb-1 ml-4">
          Name
        </label>
        <input
          type="text"
          className="aside input"
          id="name"
          placeholder="E.g. Cnet"
          autoFocus
          autoCorrect="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="link" className="text-sm mb-1 ml-4">
          link
        </label>
        <input
          type="url"
          className="aside input"
          id="link"
          placeholder="https://cnet.com/feed"
        />
      </div>
    </form>
  );
};

export default SideBarForm;
