import React, { useEffect, useState } from "react";
import styles from "./Specifications.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Specifications = ({ specifications, p_id, isAdmin }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editSpecs, setEditSpecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (specifications && !editMode) {
      setEditSpecs(
        specifications.map((spec) => ({
          spec_name: spec.spec_name,
          spec_value: Array.isArray(spec.spec_value)
            ? spec.spec_value.map((item) => ({
                ...item,
                value: Array.isArray(item.value)
                  ? item.value.map((v) => ({ ...v }))
                  : item.value,
              }))
            : [],
        }))
      );
    }
  }, [specifications, editMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };


  const parsedSpecifications = editMode ? editSpecs : specifications?.map((spec) => {
    let parsedValue = spec.spec_value;
    try {
      parsedValue =
        typeof spec.spec_value === "string"
          ? JSON.parse(spec.spec_value)
          : spec.spec_value;
    } catch (e) {
      console.error("Invalid JSON:", e);
    }
    return {
      spec_name: spec.spec_name,
      spec_value: parsedValue,
    };
  });

  return (
    <section className={styles.specifications} ref={ref}>
      <motion.div
        className={styles.container}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className={styles.content}>
          <motion.div className={styles.table} variants={itemVariants}>
            <div className={styles.head}>
              <motion.p 
                className={`${styles.title} ui text size-h4`}
                variants={itemVariants}
              >
                Specifications
              </motion.p>
              {isAdmin && !editMode && (
                <button style={{marginLeft:16, padding:"4px 12px", fontSize:14, borderRadius:4, border:"1px solid #ccc", background:"#f5f5f5", cursor:"pointer"}} onClick={()=>setEditMode(true)}>Edit</button>
              )}
              {isAdmin && editMode && (
                <>
                  <button style={{marginLeft:16, padding:"4px 12px", fontSize:14, borderRadius:4, border:"1px solid #1741be", background:"#1741be", color:"#fff", cursor:"pointer"}} onClick={async()=>{
                    setLoading(true); setError(""); setSuccess("");
                    try {
                      const res = await fetch("/api/update-specifications", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ p_id, specifications: editSpecs }),
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.error || "Update failed");
                      setSuccess("Updated successfully");
                      setEditMode(false);
                    } catch (err) {
                      setError(err.message);
                    } finally {
                      setLoading(false);
                    }
                  }}>Submit</button>
                  <button style={{marginLeft:8, padding:"4px 12px", fontSize:14, borderRadius:4, border:"1px solid #ccc", background:"#fff", color:"#333", cursor:"pointer"}} onClick={()=>setEditMode(false)}>Cancel</button>
                </>
              )}
            </div>
            <motion.div 
              className={styles.productspecs}
              variants={containerVariants}
            >
              {parsedSpecifications?.map((spec, index) => (
                <motion.div 
                  key={index} 
                  className={styles.specificationSection}
                  variants={itemVariants}
                >
                  {editMode ? (
                    <>
                      <input type="text" value={spec.spec_name} style={{fontWeight:"bold",fontSize:"1.1rem",marginBottom:6,border:"1px solid #ccc",borderRadius:4,padding:"2px 8px",width:"100%"}}
                        onChange={e=>{
                          const updated = [...editSpecs];
                          updated[index].spec_name = e.target.value;
                          setEditSpecs(updated);
                        }}
                      />
                      <button style={{marginLeft:8, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #e00",background:"#fff",color:"#e00",cursor:"pointer"}} onClick={()=>{
                        const updated = editSpecs.filter((_,i)=>i!==index);
                        setEditSpecs(updated);
                      }}>Delete Header</button>
                      <button style={{marginLeft:8, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #1741be",background:"#fff",color:"#1741be",cursor:"pointer"}} onClick={()=>{
                        const updated = [...editSpecs];
                        updated.splice(index+1,0,{spec_name:"New Header",spec_value:[]});
                        setEditSpecs(updated);
                      }}>Add Header</button>
                      <button style={{marginLeft:8, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #1741be",background:"#fff",color:"#1741be",cursor:"pointer"}} onClick={()=>{
                        const updated = [...editSpecs];
                        updated[index].spec_value.push({name:"New Spec",value:""});
                        setEditSpecs(updated);
                      }}>Add Spec</button>
                    </>
                  ) : (
                    Array.isArray(spec.spec_value) &&
                      spec.spec_value.some((item) => item?.value) && ( 
                        <motion.p 
                          className={`${styles.materialfinish} ui text size-h6`}
                          variants={itemVariants}
                        >
                          {spec.spec_name.toUpperCase()}
                        </motion.p>
                      )
                  )}
                  <div className={styles.specItems}>
                    {spec.spec_value.map((item, idx) => {
                      if (editMode) {
                        // Editable fields for spec_value
                        if (item.name === "Wood Fires" || item.name === "Gas Fires") {
                          return (
                            <div key={idx} style={{marginBottom:8,borderBottom:"1px solid #eee",paddingBottom:8}}>
                              <input type="text" value={item.name} style={{fontWeight:"bold",marginBottom:4,border:"1px solid #ccc",borderRadius:4,padding:"2px 8px",width:"60%"}}
                                onChange={e=>{
                                  const updated = [...editSpecs];
                                  updated[index].spec_value[idx].name = e.target.value;
                                  setEditSpecs(updated);
                                }}
                              />
                              <button style={{marginLeft:8, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #e00",background:"#fff",color:"#e00",cursor:"pointer"}} onClick={()=>{
                                const updated = [...editSpecs];
                                updated[index].spec_value = updated[index].spec_value.filter((_,i)=>i!==idx);
                                setEditSpecs(updated);
                              }}>Delete</button>
                              <button style={{marginLeft:8, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #1741be",background:"#fff",color:"#1741be",cursor:"pointer"}} onClick={()=>{
                                const updated = [...editSpecs];
                                updated[index].spec_value.splice(idx+1,0,{name:"New Spec",value:[]});
                                setEditSpecs(updated);
                              }}>Add</button>
                              {/* Nested value array */}
                              {item.value.map((energySpecItem, energySpecIndex) => (
                                <div key={energySpecIndex} style={{marginLeft:16,marginBottom:4}}>
                                  <input type="text" value={energySpecItem.name} style={{marginRight:8,border:"1px solid #ccc",borderRadius:4,padding:"2px 8px",width:"40%"}}
                                    onChange={e=>{
                                      const updated = [...editSpecs];
                                      updated[index].spec_value[idx].value[energySpecIndex].name = e.target.value;
                                      setEditSpecs(updated);
                                    }}
                                  />
                                  <input type="text" value={energySpecItem.value} style={{marginRight:8,border:"1px solid #ccc",borderRadius:4,padding:"2px 8px",width:"40%"}}
                                    onChange={e=>{
                                      const updated = [...editSpecs];
                                      updated[index].spec_value[idx].value[energySpecItemIndex].value = e.target.value;
                                      setEditSpecs(updated);
                                    }}
                                  />
                                  <button style={{marginLeft:4, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #e00",background:"#fff",color:"#e00",cursor:"pointer"}} onClick={()=>{
                                    const updated = [...editSpecs];
                                    updated[index].spec_value[idx].value = updated[index].spec_value[idx].value.filter((_,i)=>i!==energySpecIndex);
                                    setEditSpecs(updated);
                                  }}>Delete</button>
                                  <button style={{marginLeft:4, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #1741be",background:"#fff",color:"#1741be",cursor:"pointer"}} onClick={()=>{
                                    const updated = [...editSpecs];
                                    updated[index].spec_value[idx].value.splice(energySpecIndex+1,0,{name:"New Field",value:""});
                                    setEditSpecs(updated);
                                  }}>Add</button>
                                </div>
                              ))}
                            </div>
                          );
                        } else {
                          return (
                            <div key={idx} style={{marginBottom:8,borderBottom:"1px solid #eee",paddingBottom:8}}>
                              <input type="text" value={item.name} style={{fontWeight:"bold",marginBottom:4,border:"1px solid #ccc",borderRadius:4,padding:"2px 8px",width:"60%"}}
                                onChange={e=>{
                                  const updated = [...editSpecs];
                                  updated[index].spec_value[idx].name = e.target.value;
                                  setEditSpecs(updated);
                                }}
                              />
                              <button style={{marginLeft:8, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #e00",background:"#fff",color:"#e00",cursor:"pointer"}} onClick={()=>{
                                const updated = [...editSpecs];
                                updated[index].spec_value = updated[index].spec_value.filter((_,i)=>i!==idx);
                                setEditSpecs(updated);
                              }}>Delete</button>
                              <button style={{marginLeft:8, padding:"2px 8px",fontSize:13,borderRadius:4,border:"1px solid #1741be",background:"#fff",color:"#1741be",cursor:"pointer"}} onClick={()=>{
                                const updated = [...editSpecs];
                                updated[index].spec_value.splice(idx+1,0,{name:"New Spec",value:""});
                                setEditSpecs(updated);
                              }}>Add</button>
                              <input type="text" value={item.value} style={{marginLeft:8,border:"1px solid #ccc",borderRadius:4,padding:"2px 8px",width:"40%"}}
                                onChange={e=>{
                                  const updated = [...editSpecs];
                                  updated[index].spec_value[idx].value = e.target.value;
                                  setEditSpecs(updated);
                                }}
                              />
                            </div>
                          );
                        }
                      } else {
                        // ...existing code for non-edit mode...
                        if (item.name == "Wood Fires" || item.name == "Gas Fires") {
                          if (item.value?.length > 0) {
                            return item.value?.map((energySpecItem, energySpecIndex) => {
                              if (energySpecItem.value !== "NA" && energySpecItem.value != "") {
                                return (
                                  <motion.div key={energySpecIndex} className={styles.specItem} variants={itemVariants} whileHover={{ scale: 1.02 }}>
                                    <p className="homeelectric ui text size-body_medium">{energySpecItem.name}</p>
                                    <p className="distanceTwo ui text size-body_medium">{energySpecItem.value}</p>
                                  </motion.div>
                                );
                              }
                              return null;
                            });
                          }
                        } else {
                          if (item.value !== "NA" && item.value != "") {
                            return (
                              <motion.div key={idx} className={styles.specItem} variants={itemVariants} whileHover={{ scale: 1.02 }}>
                                <p className="homeelectric ui text size-body_medium">{item.name}</p>
                                {typeof item.value === "object" ? (
                                  <div className={styles.rowng}>
                                    <p className="homeelectric ui text size-body_medium">{item.value.NG || "-"}</p>
                                    <p className="homeelectric ui text size-body_medium">{item.value.LP || "-"}</p>
                                    <p className="homeelectric ui text size-body_medium">{item.value.ULPG || "-"}</p>
                                  </div>
                                ) : (
                                  <p className="distanceTwo ui text size-body_medium">{item.value}</p>
                                )}
                              </motion.div>
                            );
                          }
                        }
                      }
                    })}
                  </div>
                </motion.div>
              ))}
              {editMode && (
                <div style={{width:'100%', display:'flex', justifyContent:'center', margin:'24px 0'}}>
                  <button style={{padding:"8px 32px",fontSize:16,borderRadius:4,border:"2px solid #1741be",background:"#fff",color:"#1741be",cursor:"pointer", width:'100%', maxWidth:400}} onClick={()=>{
                    setEditSpecs([...editSpecs, {spec_name:"New Header",spec_value:[]}]);
                  }}>Add Header</button>
                </div>
              )}
              <motion.div 
                className={styles.energynotes}
                variants={itemVariants}
              >
                <p>
                  Energy Notes: Output depends on gas type and flue
                  configuration
                </p>
              </motion.div>
              {error && <div style={{color:"red",marginTop:8}}>{error}</div>}
              {success && <div style={{color:"green",marginTop:8}}>{success}</div>}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Specifications;