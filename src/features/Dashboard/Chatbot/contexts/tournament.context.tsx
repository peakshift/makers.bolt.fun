import { createContext, useState, useContext, useCallback } from "react";
import { Tournament, useGetTournamentByIdQuery } from "src/graphql";

interface TournamentContext {
  tournament?: Tournament;
  updateTournament: (newTournament: Partial<Tournament>) => void;
}

const context = createContext<TournamentContext>(null!);

export const TournamentContextProvider = ({
  children,
  idOrSlug,
}: {
  children: React.ReactNode;
  idOrSlug: string;
}) => {
  const [tournament, setTournament] = useState<Tournament>();

  useGetTournamentByIdQuery({
    variables: {
      idOrSlug,
    },
    onCompleted: (data) => {
      setTournament(data.getTournamentById);
    },
  });

  const updateTournament = useCallback((newTournament: Partial<Tournament>) => {
    setTournament((prev) => ({ ...prev, ...(newTournament as any) }));
  }, []);

  return (
    <context.Provider value={{ tournament, updateTournament }}>
      {children}
    </context.Provider>
  );
};

export const useTournament = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(
      "useTournament must be used within a TournamentContextProvider"
    );
  }
  return ctx;
};
