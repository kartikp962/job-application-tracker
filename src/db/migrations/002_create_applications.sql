CREATE TYPE application_status AS ENUM (
    'wishlist', 'applied', 'interviewing', 'offer', 'rejected', 'withdrawn'
);

CREATE TABLE APPLICATIONS (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company                 TEXT NOT NULL,
    role                    TEXT NOT NULL,
    job_description_text    TEXT NOT NULL,
    resume_snapshot_text    TEXT,
    notes                   TEXT,
    status                  application_status NOT NULL DEFAULT 'wishlist',
    applied_date            DATE,
    links                   TEXT[],
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);