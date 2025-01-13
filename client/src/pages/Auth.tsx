import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Auth() {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-semibold">
        Choose a pseudo to start chatting
      </h1>
      <div className="flex flex-row gap-2 items-center">
        <Input type="text" placeholder="Your pseudo" className="max-w-lg" />
        <Button>Start chatting</Button>
      </div>
    </section>
  );
}
