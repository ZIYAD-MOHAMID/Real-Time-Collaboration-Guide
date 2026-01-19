"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg rotate-12 flex items-center justify-center font-bold">
            C
          </div>
          <span className="text-xl font-bold tracking-tight">
            Collaborative Workspace
          </span>
        </motion.div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          {["Features", "Stack"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: "#fff" }}
              className="transition-colors relative"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-slate-800 rounded-full text-sm font-semibold border border-slate-700"
          >
            Sign In
          </motion.button>
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        {/* Animated Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600 blur-[120px] rounded-full -z-10"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-8 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 tracking-wider uppercase"
          >
            🚀 Real-time Collaboration Powered by Yjs
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Plan. Draw. Write. <br />
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
              className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 text-transparent bg-clip-text"
            >
              All in one workspace.
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            A high-performance digital workspace for teams. Edit documents
            simultaneously with zero conflicts.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg cursor-pointer"
              >
                Get Started
              </motion.div>
            </Link>
            <motion.a
              href="https://github.com/ZIYAD-MOHAMID/Real-Time-Collaboration-Guide"
              whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg border border-slate-800"
            >
              View on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-8 py-24 border-t border-slate-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Planning",
              icon: "📅",
              color: "blue",
              desc: "Coordinate projects with instant feedback and CSV exports.",
            },
            {
              title: "Drawing",
              icon: "🎨",
              color: "emerald",
              desc: "Sketch ideas in real-time. High-resolution PNG exports.",
            },
            {
              title: "Writing",
              icon: "📝",
              color: "indigo",
              desc: "Full Markdown support with conflict-free CRDT merging.",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-colors cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6"
              >
                <span className="text-2xl">{feature.icon}</span>
              </motion.div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <motion.footer
        id="stack"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        className="pb-20 pt-10 text-center"
      >
        <p className="text-sm font-mono tracking-widest uppercase mb-6">
          Built with Modern Tech
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {["Next.js 16", "GraphQL", "Prisma", "PostgreSQL", "Yjs"].map(
            (tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.1, color: "#60a5fa", opacity: 1 }}
                className="px-4 py-2 bg-slate-900 rounded-md border border-slate-800 cursor-default"
              >
                {tech}
              </motion.span>
            ),
          )}
        </div>
      </motion.footer>
    </div>
  );
}
