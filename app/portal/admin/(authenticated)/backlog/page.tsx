"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2, X, ChevronDown, Calendar, Trash2 } from "lucide-react";

interface Task {
  id: string;
  name: string;
  projectId: string;
  status: string;
  assignedTo?: string;
  priority?: string;
  dueDate?: string;
}

interface Project {
  id: string;
  name: string;
}

const COLUMNS = [
  { key: "Backlog", label: "Backlog", color: "bg-gray-400" },
  { key: "To Do", label: "To Do", color: "bg-blue-400" },
  { key: "In Arbeit", label: "In Arbeit", color: "bg-yellow-400" },
  { key: "Erledigt", label: "Erledigt", color: "bg-emerald-400" },
];

const PRIORITY_OPTIONS = [
  { value: "high", label: "Hoch", className: "text-red-600 bg-red-50" },
  { value: "medium", label: "Mittel", className: "text-yellow-600 bg-yellow-50" },
  { value: "low", label: "Niedrig", className: "text-gray-500 bg-gray-100" },
];

const ASSIGNEE_OPTIONS = ["Louis", "Caro"];

function getPriorityStyle(priority?: string) {
  return PRIORITY_OPTIONS.find(p => p.value === priority)?.className || "text-gray-500 bg-gray-100";
}

function getPriorityLabel(priority?: string) {
  return PRIORITY_OPTIONS.find(p => p.value === priority)?.label || priority || "";
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
  } catch {
    return dateStr;
  }
}

export default function AdminBacklogPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterProject, setFilterProject] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // New task form
  const [newName, setNewName] = useState("");
  const [newProjectId, setNewProjectId] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [tasksRes, projRes] = await Promise.all([
          fetch("/api/portal/admin/backlog").then(r => r.json()),
          fetch("/api/portal/admin/projekte").then(r => r.json()),
        ]);
        setTasks(Array.isArray(tasksRes) ? tasksRes : []);
        setProjects(Array.isArray(projRes) ? projRes.map((p: any) => ({ id: p.id, name: p.name })) : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function getProjectName(projectId: string) {
    return projects.find(p => p.id === projectId)?.name || "Unbekanntes Projekt";
  }

  const filteredTasks = tasks.filter(t => {
    if (filterProject && t.projectId !== filterProject) return false;
    if (filterAssignee && t.assignedTo !== filterAssignee) return false;
    return true;
  });

  async function createTask() {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/portal/admin/backlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          projectId: newProjectId || undefined,
          assignedTo: newAssignee || undefined,
          priority: newPriority || undefined,
          dueDate: newDueDate || undefined,
          status: "Backlog",
        }),
      });
      const created = await res.json();
      setTasks(prev => [...prev, created]);
      setNewName("");
      setNewProjectId("");
      setNewAssignee("");
      setNewPriority("");
      setNewDueDate("");
      setShowForm(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function updateTaskStatus(id: string, newStatus: string) {
    setActiveDropdown(null);
    try {
      await fetch(`/api/portal/admin/backlog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteTask(id: string) {
    try {
      await fetch(`/api/portal/admin/backlog/${id}`, { method: "DELETE" });
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">Backlog</h1>
          <p className="text-sm text-gray-500 mt-1">{tasks.length} Aufgaben insgesamt</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Neue Aufgabe
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterProject}
          onChange={e => setFilterProject(e.target.value)}
          className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-full px-5 py-2.5 text-sm font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 appearance-none cursor-pointer pr-10"
        >
          <option value="">Alle Projekte</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          value={filterAssignee}
          onChange={e => setFilterAssignee(e.target.value)}
          className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-full px-5 py-2.5 text-sm font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 appearance-none cursor-pointer pr-10"
        >
          <option value="">Alle Personen</option>
          {ASSIGNEE_OPTIONS.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* New task form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Neue Aufgabe</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Aufgabenname *"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="col-span-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
            <select
              value={newProjectId}
              onChange={e => setNewProjectId(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="">Projekt zuordnen</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <select
              value={newAssignee}
              onChange={e => setNewAssignee(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="">Zuweisen an</option>
              {ASSIGNEE_OPTIONS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="">Priorität</option>
              <option value="high">Hoch</option>
              <option value="medium">Mittel</option>
              <option value="low">Niedrig</option>
            </select>
            <input
              type="date"
              value={newDueDate}
              onChange={e => setNewDueDate(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={createTask}
              disabled={saving || !newName.trim()}
              className="bg-gray-900 text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Erstellen"}
            </button>
          </div>
        </div>
      )}

      {/* Kanban board */}
      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin" /></div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map(col => {
            const columnTasks = filteredTasks.filter(t => t.status === col.key);
            return (
              <div key={col.key} className="flex-1 min-w-[250px]">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${col.color}`} />
                  <h3 className="text-sm font-semibold text-gray-900">{col.label}</h3>
                  <span className="text-xs text-gray-400">{columnTasks.length}</span>
                </div>
                <div className="space-y-2">
                  {columnTasks.length === 0 ? (
                    <div className="bg-white/50 rounded-xl border border-dashed border-gray-200 p-4 text-center">
                      <p className="text-xs text-gray-300">Keine Aufgaben</p>
                    </div>
                  ) : (
                    columnTasks.map(task => (
                      <div key={task.id} className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 group">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-gray-900 flex-1">{task.name}</p>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-gray-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 ml-2 flex-shrink-0"
                            title="Aufgabe löschen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{getProjectName(task.projectId)}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {task.priority && (
                              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityStyle(task.priority)}`}>
                                {getPriorityLabel(task.priority)}
                              </span>
                            )}
                            {task.assignedTo && (
                              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                {task.assignedTo}
                              </span>
                            )}
                          </div>
                          {task.dueDate && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Calendar className="w-3 h-3" />
                              {formatDate(task.dueDate)}
                            </span>
                          )}
                        </div>

                        {/* Status change dropdown */}
                        <div className="relative mt-3 pt-3 border-t border-gray-50">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === task.id ? null : task.id)}
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            Verschieben
                            <ChevronDown className="w-3 h-3" />
                          </button>
                          {activeDropdown === task.id && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 py-1 z-10 min-w-[140px]">
                              {COLUMNS.filter(c => c.key !== task.status).map(c => (
                                <button
                                  key={c.key}
                                  onClick={() => updateTaskStatus(task.id, c.key)}
                                  className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${c.color}`} />
                                  {c.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
