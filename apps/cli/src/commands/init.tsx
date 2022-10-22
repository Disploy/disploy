import {
  createGSDB,
  Extra,
  GitStarterDatabase,
  Starter,
} from "@disploy/starter";
import { render, Text } from "ink";
import SelectInput from "ink-select-input/build";
import type { Item } from "ink-select-input/build/SelectInput";
import Spinner from "ink-spinner";
import React from "react";
import type { Argv } from "yargs";
import { MultiSelect } from "../components/MultiSelect";
import { StartersEndpoint } from "../Constants";

export const aliases: string[] = [];
export const desc: string = "Initialize a new project";

export const builder = (yargs: Argv) => yargs.options({});

const Init = () => {
  const [database, setDatabase] = React.useState<GitStarterDatabase | null>(
    null
  );

  const [starter, setStarter] = React.useState<Starter | null>(null);
  const [loading, setLoading] = React.useState<string | null>("Loading...");

  const install = async ({
    starter,
    extras,
  }: {
    starter: Starter;
    extras: Extra[];
  }) => {
    setLoading("Installing");
    try {
      await starter.install(extras);
    } catch (error) {
      console.error(error);
    }
    setLoading(null);
  };

  React.useEffect(() => {
    (async () => {
      const db = await createGSDB(StartersEndpoint);

      setDatabase(db);

      setLoading(null);
    })();
  }, []);

  const handleSelectStarter = (item: Item<Starter>) => {
    setStarter(item.value);
  };

  const starterItems: Item<Starter>[] =
    database?.starters.map((starter) => ({
      label: `${starter.name} - ${starter.description}`,
      value: starter,
    })) ?? [];

  const handleSelectExtras = (items: Item<Extra>[]) => {
    install({
      starter: starter!,
      extras: items.map((item) => item.value),
    });
  };

  const extraItems: Item<Extra>[] =
    starter?.extras.map((extra) => ({
      label: `${extra.name} - ${extra.description}`,
      value: extra,
    })) ?? [];

  while (loading) {
    return (
      <Text color="grey">
        <Text color="green">
          <Spinner type="dots" />
        </Text>
        {` ${loading}`}
      </Text>
    );
  }

  return (
    <>
      {starter ? (
        <>
          <Text color="greenBright">Select optional extras:</Text>
          <MultiSelect items={extraItems} onSubmit={handleSelectExtras} />
        </>
      ) : (
        <>
          <Text color="greenBright">Select a starter:</Text>
          <SelectInput items={starterItems} onSelect={handleSelectStarter} />
        </>
      )}
    </>
  );
};

export const handler = (_argv: Argv) => {
  render(<Init />);
};
