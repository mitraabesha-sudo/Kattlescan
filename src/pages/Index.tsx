import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Search, ChevronUp, RotateCcw, Check, MapPin, Tag, Upload, ImageIcon } from "lucide-react";
import CattleSilhouette from "@/components/CattleSilhouette";
import KeypointOverlay from "@/components/KeypointOverlay";
import MeasurementCard from "@/components/MeasurementCard";
import SyncBar from "@/components/SyncBar";

type AppState = "identify" | "capture" | "processing" | "results";

const DEMO_KEYPOINTS = [
  { x: 130, y: 108, label: "Withers", value: "138cm" },
  { x: 200, y: 105, label: "Back", value: "142cm" },
  { x: 280, y: 108, label: "Hip", value: "140cm" },
  { x: 330, y: 145, label: "Rump", value: "14.2°" },
  { x: 120, y: 160, label: "Chest", value: "72cm" },
  { x: 300, y: 160, label: "Barrel", value: "68cm" },
];

const DEMO_CONNECTIONS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [0, 4], [2, 5], [4, 5],
];

const DEMO_MEASUREMENTS = [
  { label: "Body Length", value: "168.4", unit: "cm", confidence: 94 },
  { label: "Height at Withers", value: "138.2", unit: "cm", confidence: 91 },
  { label: "Chest Width", value: "72.1", unit: "cm", confidence: 87 },
  { label: "Rump Angle", value: "14.2", unit: "°", confidence: 78 },
];

const Index = () => {
  const [state, setState] = useState<AppState>("identify");
  const [animalId, setAnimalId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIdentify = () => {
    if (animalId.trim()) setState("capture");
  };

  const handleCapture = () => {
    setState("processing");
    setTimeout(() => setState("results"), 2400);
  };

  const handleReset = () => {
    setState("identify");
    setAnimalId("");
    setDrawerOpen(true);
    setUploadedImage(null);
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      // Auto-trigger processing after upload
      setState("processing");
      setTimeout(() => setState("results"), 2400);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <h1 className="text-sm font-display font-bold text-foreground tracking-tight">
              ATC System
            </h1>
            <p className="text-[10px] text-muted-foreground font-display uppercase tracking-[0.15em]">
              Animal Type Classification
            </p>
          </div>
          {state !== "identify" && (
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-display">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" /> {animalId}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Karnal, HR
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* Step 1: Identify */}
          {state === "identify" && (
            <motion.div
              key="identify"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center px-6 py-12"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-foreground tracking-tight mb-2">
                  Begin Inspection
                </h2>
                <p className="text-sm text-muted-foreground font-body">
                  Enter animal ID or scan RFID tag to start classification.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Animal ID (e.g., IN-HR-2024-04892)"
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleIdentify()}
                    className="w-full h-12 pl-10 pr-4 bg-card border border-border rounded-lg text-sm font-display text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleIdentify}
                  disabled={!animalId.trim()}
                  className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-display font-semibold text-sm disabled:opacity-40 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                >
                  Start Classification
                </button>

                <button className="w-full h-12 bg-secondary text-secondary-foreground rounded-lg font-display font-medium text-sm border border-border hover:bg-muted transition-colors">
                  Scan RFID Tag
                </button>
              </div>

              {/* Recent records */}
              <div className="mt-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-display mb-3">
                  Recent Inspections
                </p>
                {[
                  { id: "IN-HR-2024-04891", breed: "Sahiwal", score: "82" },
                  { id: "IN-HR-2024-04890", breed: "Murrah", score: "76" },
                  { id: "IN-HR-2024-04889", breed: "Gir", score: "89" },
                ].map((record) => (
                  <button
                    key={record.id}
                    onClick={() => { setAnimalId(record.id); setState("capture"); }}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors mb-1"
                  >
                    <div className="text-left">
                      <p className="text-xs font-display font-medium text-foreground">{record.id}</p>
                      <p className="text-[10px] text-muted-foreground">{record.breed}</p>
                    </div>
                    <span className="text-xs font-display tabular-nums text-primary font-bold">
                      {record.score}/100
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Capture */}
          {state === "capture" && (
            <motion.div
              key="capture"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              {/* Viewfinder */}
              <div className="relative flex-1 min-h-[40vh] bg-foreground/95 blueprint-grid flex items-center justify-center overflow-hidden">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded animal" className="max-h-full max-w-full object-contain" />
                ) : (
                  <CattleSilhouette aligned={false} />
                )}

                {/* Guide text */}
                <div className="absolute top-4 left-0 right-0 text-center">
                  <p className="text-xs font-display text-blueprint font-medium bg-foreground/80 inline-block px-3 py-1.5 rounded">
                    Align animal to profile frame
                  </p>
                </div>

                {/* Corner markers */}
                {[
                  "top-6 left-6",
                  "top-6 right-6",
                  "bottom-20 left-6",
                  "bottom-20 right-6",
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-6 h-6 border-blueprint`}
                    style={{
                      borderTopWidth: i < 2 ? 2 : 0,
                      borderBottomWidth: i >= 2 ? 2 : 0,
                      borderLeftWidth: i % 2 === 0 ? 2 : 0,
                      borderRightWidth: i % 2 === 1 ? 2 : 0,
                      borderColor: "hsl(199, 89%, 48%)",
                    }}
                  />
                ))}

                {/* Capture button */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <button
                    onClick={handleCapture}
                    className="w-16 h-16 rounded-full border-4 border-primary-foreground/80 bg-primary flex items-center justify-center shadow-functional active:scale-95 transition-transform"
                  >
                    <Camera className="w-6 h-6 text-primary-foreground" />
                  </button>
                </div>
              </div>

              {/* Upload area */}
              <div className="px-4 py-4 bg-background border-t border-border">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-display font-medium text-foreground">
                        Upload animal photo
                      </p>
                      <p className="text-[10px] text-muted-foreground font-body mt-0.5">
                        Drag & drop or tap to browse · JPG, PNG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Processing */}
          {state === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="relative flex-1 min-h-[50vh] bg-foreground/95 blueprint-grid flex items-center justify-center overflow-hidden">
                <CattleSilhouette aligned={true} />
                <KeypointOverlay points={DEMO_KEYPOINTS} connections={DEMO_CONNECTIONS} />

                {/* Scan line */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute inset-y-0 w-full animate-scan-line">
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-blueprint/20 to-transparent" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs font-display text-blueprint"
                  >
                    Extracting measurements...
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {state === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              {/* Top: Blueprint view (collapsed) */}
              <div className="relative h-[35vh] bg-foreground/95 blueprint-grid flex items-center justify-center overflow-hidden">
                <CattleSilhouette aligned={true} />
                <KeypointOverlay points={DEMO_KEYPOINTS} connections={DEMO_CONNECTIONS} />
              </div>

              {/* Bottom drawer: Results */}
              <motion.div
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="flex-1 bg-background rounded-t-2xl -mt-4 relative z-10 border-t border-border"
              >
                {/* Drawer handle */}
                <button
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  className="w-full flex justify-center pt-2 pb-1"
                >
                  <div className="w-10 h-1 bg-border rounded-full" />
                </button>

                <div className="px-4 pb-20">
                  {/* Score header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-display">
                        ATC Score
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold tabular-nums text-foreground">
                          84.2
                        </span>
                        <span className="text-sm text-muted-foreground font-body">/ 100</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-display">
                        Breed Detected
                      </p>
                      <p className="text-sm font-display font-semibold text-foreground">Sahiwal</p>
                    </div>
                  </div>

                  {/* Measurements grid */}
                  <AnimatePresence>
                    {drawerOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-display mb-3">
                          Extracted Measurements
                        </p>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {DEMO_MEASUREMENTS.map((m, i) => (
                            <MeasurementCard key={i} {...m} />
                          ))}
                        </div>

                        {/* Confidence warning */}
                        {DEMO_MEASUREMENTS.some(m => m.confidence < 85) && (
                          <div className="bg-sync-pending/50 border border-sync-pending-foreground/20 rounded-lg p-3 mb-6 flex items-start gap-2">
                            <RotateCcw className="w-4 h-4 text-sync-pending-foreground mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-display font-medium text-sync-pending-foreground">
                                Low confidence on Rump Angle
                              </p>
                              <p className="text-[10px] text-sync-pending-foreground/70 font-body mt-0.5">
                                Consider retaking from a different angle for better accuracy.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button
                            onClick={handleReset}
                            className="flex-1 h-12 bg-secondary text-secondary-foreground rounded-lg font-display font-medium text-sm border border-border flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Retake
                          </button>
                          <button className="flex-1 h-12 bg-primary text-primary-foreground rounded-lg font-display font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.98]">
                            <Check className="w-4 h-4" />
                            Confirm & Sync
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sync bar */}
      <SyncBar pendingCount={3} isOnline={true} />
    </div>
  );
};

export default Index;
