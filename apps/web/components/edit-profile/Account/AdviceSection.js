import { X } from "@phosphor-icons/react";
import { Input, Button, Label } from "@shadcdn/ui";

import EmptyState from "./EmptyState";
import FormBlock from "./FormBlock";

const AdviceSection = ({ profile, setProfile, addAdviceItem, removeAdviceItem }) => {
  return (
    <FormBlock title="Advice" description="What can you advise on? Add some topics you can help others with.">
      {profile?.adviceOn?.length === 0 && <EmptyState label="Things which you can advise others on" />}
      <div className="space-y-4 divide-y">
        {profile?.adviceOn?.length > 0 &&
          profile.adviceOn.map((advice, i) => (
            <div key={i} className="space-y-4 pt-2">
              <div>
                <Label>{`Advice #${i + 1}`}</Label>
                <div className="flex items-end gap-x-2">
                  <Input
                    placeholder="e.g. How to get started with public speaking"
                    value={advice}
                    onChange={(e) => {
                      const newAdvice = [...profile.adviceOn];
                      newAdvice[i] = e.target.value.slice(0, 100);
                      setProfile({ ...profile, adviceOn: newAdvice });
                    }}
                    required
                  />
                  <button
                    onClick={() => removeAdviceItem(i)}
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-1 pr-12 text-right text-xs text-gray-400">{advice.length}/100</div>
              </div>
            </div>
          ))}
      </div>
      <div className="col-span-full mt-6">
        <Button onClick={addAdviceItem} variant="outline" size="sm">
          Add advice
        </Button>
      </div>
    </FormBlock>
  );
};

export default AdviceSection;
