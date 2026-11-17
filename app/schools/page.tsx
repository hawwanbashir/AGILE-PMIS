
"use client";

import { useEffect, useState, type FormEvent } from "react";

type LGA = {
  id: string;
  name: string;
  code: string;
};

type School = {
  id: string;
  name: string;
  schoolCode: string;
  community: string | null;
  schoolType: string | null;
  lga: { name: string };
};

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
const [selectedLga, setSelectedLga] = useState("");
const [selectedType, setSelectedType] = useState("");
  const [lgas, setLgas] = useState<LGA[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [lgaId, setLgaId] = useState("");
  const [community, setCommunity] = useState("");
  const [schoolType, setSchoolType] = useState("Primary");

  const [editingSchoolId, setEditingSchoolId] = useState<string | null>(null);

  async function loadData() {
    try {
      setError("");

      const [schoolsResponse, lgasResponse] = await Promise.all([
        fetch("/api/schools"),
        fetch("/api/lgas"),
      ]);

      const schoolsData = await schoolsResponse.json();
      const lgasData = await lgasResponse.json();

      if (!schoolsResponse.ok) {
        throw new Error("Unable to load schools.");
      }

      if (!lgasResponse.ok) {
        throw new Error("Unable to load LGAs.");
      }

      setSchools(schoolsData);
      setLgas(lgasData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
  editingSchoolId
    ? `/api/schools/${editingSchoolId}`
    : "/api/schools",
  {
    method: editingSchoolId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          schoolCode,
          lgaId,
          community,
          schoolType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "School registration failed.");
      }

      setMessage(
  editingSchoolId
    ? "School updated successfully!"
    : "School registered successfully!"
);
setEditingSchoolId(null);

      setName("");
      setSchoolCode("");
      setLgaId("");
      setCommunity("");
      setSchoolType("Primary");

      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setSaving(false);
    }
  }

function handleEdit(school: School) {
  const selectedLgaRecord = lgas.find(
    (lga) => lga.name === school.lga.name
  );

  setEditingSchoolId(school.id);
  setName(school.name);
  setSchoolCode(school.schoolCode);
  setLgaId(selectedLgaRecord?.id || "");
  setCommunity(school.community || "");
  setSchoolType(school.schoolType || "Primary");

  setMessage("");
  setError("");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function handleDelete(school: School) {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${school.name}? This action cannot be undone.`
  );

  if (!confirmed) return;

  setError("");
  setMessage("");

  try {
    const response = await fetch(`/api/schools/${school.id}`, {
      method: "DELETE",
    });

    const data: { error?: string; message?: string } =
      await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Unable to delete school.");
    }

    if (editingSchoolId === school.id) {
      setEditingSchoolId(null);
      setName("");
      setSchoolCode("");
      setLgaId("");
      setCommunity("");
      setSchoolType("Primary");
    }

    setMessage(data.message || "School deleted successfully!");

    await loadData();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Unable to delete school."
    );
  }
}


const filteredSchools = schools.filter((school) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    school.name.toLowerCase().includes(search) ||
    school.schoolCode.toLowerCase().includes(search) ||
    (school.community || "").toLowerCase().includes(search);

  const matchesLga =
    !selectedLga || school.lga.name === selectedLga;

  const matchesType =
    !selectedType || school.schoolType === selectedType;

  return matchesSearch && matchesLga && matchesType;
});
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-bold text-slate-900">
          School Management
        </h1>

        <p className="mt-2 text-slate-600">
          AGILE-PMIS | Zamfara State
        </p>

        <section className="mt-6 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">
            {editingSchoolId ? "Update School Details" : "Register New School"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            <div>
              <label className="mb-1 block text-sm font-medium">
                School Name *
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter school name"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                School Code *
              </label>
              <input
                required
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
                placeholder="Example: SCH-ANK-001"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Local Government Area *
              </label>
              <select
                required
                value={lgaId}
                onChange={(e) => setLgaId(e.target.value)}
                className="w-full rounded-lg border bg-white p-3"
              >
                <option value="">Select LGA</option>
                {lgas.map((lga) => (
                  <option key={lga.id} value={lga.id}>
                    {lga.name}
                  </option>
                ))}
              </select>
              {lgas.length === 0 && (
                <p className="mt-1 text-sm text-amber-700">
                  No LGAs loaded yet.
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Community
              </label>
              <input
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                placeholder="Enter community"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                School Type *
              </label>
              <select
                required
                value={schoolType}
                onChange={(e) => setSchoolType(e.target.value)}
                className="w-full rounded-lg border bg-white p-3"
              >
                <option value="Primary">Primary</option>
                <option value="Junior Secondary">Junior Secondary</option>
                <option value="Senior Secondary">Senior Secondary</option>
                <option value="Combined">Combined</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={saving || lgas.length === 0}
                className="w-full rounded-lg bg-blue-700 p-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
              >
                {saving
  ? "Saving School..."
  : editingSchoolId
    ? "Update School"
    : "Register School"}
              </button>
            </div>
          </form>

          {message && (
            <p className="mt-4 rounded-lg bg-green-100 p-3 text-green-800">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-800">
              {error}
            </p>
          )}
        </section>

        <section className="mt-6 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">
            Registered Schools
          </h2>

          <p className="mt-2 text-2xl font-bold text-blue-700">
            {loading ? "Loading..." : `${schools.length} Schools`}
          </p>

         <div className="mt-5 grid gap-3 md:grid-cols-3">
  <input
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search school, code or community..."
    className="rounded-lg border p-3"
  />

  <select
    value={selectedLga}
    onChange={(e) => setSelectedLga(e.target.value)}
    className="rounded-lg border bg-white p-3"
  >
    <option value="">All LGAs</option>
    {lgas.map((lga) => (
      <option key={lga.id} value={lga.name}>
        {lga.name}
      </option>
    ))}
  </select>

  <select
    value={selectedType}
    onChange={(e) => setSelectedType(e.target.value)}
    className="rounded-lg border bg-white p-3"
  >
    <option value="">All School Types</option>
    <option value="Primary">Primary</option>
    <option value="Junior Secondary">Junior Secondary</option>
    <option value="Senior Secondary">Senior Secondary</option>
    <option value="Combined">Combined</option>
  </select>
</div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-3">School Name</th>
                  <th className="p-3">School Code</th>
                  <th className="p-3">LGA</th>
                  <th className="p-3">Community</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
               {filteredSchools.map((school) => (
                  <tr key={school.id} className="border-b">
                    <td className="p-3">{school.name}</td>
                    <td className="p-3">{school.schoolCode}</td>
                    <td className="p-3">{school.lga.name}</td>
                    <td className="p-3">{school.community || "-"}</td>
                    <td className="p-3">{school.schoolType || "-"}</td>
                    <td className="p-3">
  <div className="flex gap-2">
  <button
    type="button"
    onClick={() => handleEdit(school)}
    className="rounded-lg bg-blue-600 px-3 py-1 text-white"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={() => handleDelete(school)}
    className="rounded-lg bg-red-600 px-3 py-1 text-white"
  >
    Delete
  </button>
</div>
</td>
                  </tr>
                  
                ))}

                {!loading && filteredSchools.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-5 text-center text-slate-500">
                      No schools registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}
