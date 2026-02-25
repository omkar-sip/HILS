⚠️ Implementation Safety & Execution Rules

Refactor incrementally without breaking any existing functionality.

DO NOT remove or alter:

Current subject → module → topic workflow

Authentication logic

Persona system

AI explanation engine

All new features must be layered and modular.

Execution Layers (Follow Strictly)

Layer 1 – Data Foundation

Design proper Firestore hierarchy

Seed official VTU syllabus data

Do NOT change UI yet

Layer 2 – Academic Profile

Add academicProfile to users

Build setup wizard separately

Do not connect to dashboard yet

Layer 3 – Conditional Routing

If academicProfile exists → load dashboard

If not → show academic setup

Preserve backward compatibility

Layer 4 – Search Integration

Add global search independently

Test navigation

Ensure AI pipeline untouched

Layer 5 – UI Refinement

Replace old navigation gradually

Optimize performance

Remove redundant flows only after validation

All changes must be modular and reversible.