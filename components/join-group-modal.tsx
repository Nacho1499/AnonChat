"use client"

import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X, Link as LinkIcon, Key, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export function JoinGroupModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [method, setMethod] = useState<"invite" | "id">("invite")
  const [value, setValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleJoin = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!value.trim()) {
      toast.error("Please provide an invite code or group ID")
      return
    }

    setIsSubmitting(true)
    try {
      const payload: any = {}
      if (method === "invite") payload.inviteCode = value.trim()
      else payload.groupId = value.trim()

      const res = await fetch("/api/rooms/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error || "Failed to join group")
        return
      }

      toast.success("Joined group successfully")
      setValue("")
      setIsOpen(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to join group")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-transparent border border-border/50 text-sm rounded-lg hover:bg-muted transition">
          Join Group
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-card p-6 rounded-2xl border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold">Join Group</h3>
              <p className="text-sm text-muted-foreground">Use an invite code or the group's ID to join.</p>
            </div>
            <Dialog.Close className="p-2 rounded hover:bg-muted">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={(e) => void handleJoin(e)} className="space-y-4">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setMethod("invite")} className={`px-3 py-1 rounded ${method === "invite" ? "bg-primary text-primary-foreground" : "bg-transparent border border-border/40"}`}>
                <Key className="w-4 h-4 inline mr-2" />Invite Code
              </button>
              <button type="button" onClick={() => setMethod("id")} className={`px-3 py-1 rounded ${method === "id" ? "bg-primary text-primary-foreground" : "bg-transparent border border-border/40"}`}>
                <LinkIcon className="w-4 h-4 inline mr-2" />Group ID
              </button>
            </div>

            <div>
              <label className="text-sm">{method === "invite" ? "Invite Code" : "Group ID"}</label>
              <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={method === "invite" ? "e.g. X7b-tnk-..." : "e.g. room_1612345678_xk3"} className="mt-1 w-full rounded border border-input px-3 py-2 bg-background text-sm" disabled={isSubmitting} />
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
