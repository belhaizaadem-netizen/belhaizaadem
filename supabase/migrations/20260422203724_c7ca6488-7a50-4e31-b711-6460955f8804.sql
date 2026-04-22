-- Table to store each user's full vehicle/maintenance state
CREATE TABLE public.user_vehicle_state (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  brand TEXT NOT NULL DEFAULT 'Volkswagen',
  vehicle_name TEXT NOT NULL DEFAULT 'Mon véhicule',
  vehicle JSONB NOT NULL DEFAULT '{"modelId":null,"generationId":null,"engineId":null,"transmission":null,"drivetrain":null}'::jsonb,
  current_km INTEGER NOT NULL DEFAULT 0,
  last_done JSONB NOT NULL DEFAULT '{}'::jsonb,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_vehicle_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own vehicle state"
  ON public.user_vehicle_state FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vehicle state"
  ON public.user_vehicle_state FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vehicle state"
  ON public.user_vehicle_state FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vehicle state"
  ON public.user_vehicle_state FOR DELETE
  USING (auth.uid() = user_id);

-- Generic updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_user_vehicle_state_updated_at
BEFORE UPDATE ON public.user_vehicle_state
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();