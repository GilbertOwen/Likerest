export default function LoginAuth() {
  return (
    <form action="" className="flex flex-col gap-y-6">
      <h1 className="text-3xl font-semibold border-b-2">LOGIN</h1>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="username_email" className="text-lg font-medium">
            Username / Email
          </label>
          <input type="text" id="username_email" className="border-2 px-2 py-1.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 px-2 py-1.5"
          />
        </div>
      </div>
      <button className="text-md font-semibold px-4 py-2 hover:bg-white border-2 border-black box-border hover:text-black w-fit bg-black text-white">
        Register
      </button>
    </form>
  );
}
