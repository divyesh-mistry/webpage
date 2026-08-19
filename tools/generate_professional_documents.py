from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "files"
NAVY = colors.HexColor("#16243A")
CYAN = colors.HexColor("#087E8B")
MUTED = colors.HexColor("#4B5563")
LINE = colors.HexColor("#D7DEE8")


def styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=24,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            textColor=CYAN,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=11,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=10,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=14,
            textColor=NAVY,
            borderColor=LINE,
            borderWidth=0,
            borderPadding=0,
            spaceBefore=8,
            spaceAfter=5,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.7,
            leading=12,
            textColor=NAVY,
            spaceAfter=1,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8.6,
            leading=11,
            textColor=MUTED,
            spaceAfter=3,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11.4,
            textColor=colors.HexColor("#1F2937"),
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            leftIndent=12,
            firstLineIndent=-7,
            bulletIndent=2,
            textColor=colors.HexColor("#1F2937"),
            spaceAfter=2.4,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=10.6,
            textColor=colors.HexColor("#1F2937"),
            spaceAfter=3,
        ),
    }


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(doc.leftMargin, 0.42 * inch, LETTER[0] - doc.rightMargin, 0.42 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.27 * inch, "Dr. Divyesh A. Mistry")
    canvas.drawRightString(LETTER[0] - doc.rightMargin, 0.27 * inch, f"Page {doc.page}")
    canvas.restoreState()


def header(st, subtitle):
    links = (
        "d.mistryg@gmail.com | "
        '<link href="https://divyesh-mistry.github.io/webpage/">Website</link> | '
        '<link href="https://www.linkedin.com/in/dr-divyesh-mistry-7b40a95b/">LinkedIn</link> | '
        '<link href="https://github.com/divyesh-mistry">GitHub</link> | '
        '<link href="https://scholar.google.com/citations?user=feQuDO8AAAAJ&amp;hl=en">Google Scholar</link>'
    )
    return [
        Paragraph("Dr. Divyesh A. Mistry", st["name"]),
        Paragraph(subtitle, st["title"]),
        Paragraph(links, st["contact"]),
    ]


def section(st, title):
    return [Paragraph(title.upper(), st["section"])]


def bullets(st, items):
    return [Paragraph(item, st["bullet"], bulletText="-") for item in items]


def role(st, title, org, dates, items=None):
    block = [
        Paragraph(title, st["role"]),
        Paragraph(f"{org} | {dates}", st["meta"]),
    ]
    if items:
        block.extend(bullets(st, items))
    return [KeepTogether(block), Spacer(1, 3)]


def publication(st, title, authors, venue, link=None):
    linked_title = f'<link href="{link}">{title}</link>' if link else title
    return KeepTogether(
        [
            Paragraph(f"<b>{linked_title}</b>", st["small"]),
            Paragraph(authors, st["small"]),
            Paragraph(venue, st["meta"]),
            Spacer(1, 2),
        ]
    )


def build_resume(path):
    st = styles()
    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        leftMargin=0.58 * inch,
        rightMargin=0.58 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.56 * inch,
        title="Dr. Divyesh A. Mistry - Professional Resume",
        author="Dr. Divyesh A. Mistry",
    )
    story = header(st, "Computational Materials Scientist | Multiscale Modeling | MD, DDD and HPC")
    story += section(st, "Professional Summary")
    story.append(
        Paragraph(
            "Computational materials scientist with more than five years of experience developing physics-based simulations of plasticity, defect evolution and fracture in advanced structural materials. Expertise spans molecular dynamics, discrete dislocation dynamics, polycrystalline microstructure modeling, high-performance computing and reproducible scientific software. Research applications include nickel-based superalloys, tungsten and tungsten-rhenium alloys under extreme thermomechanical environments.",
            st["body"],
        )
    )
    story += section(st, "Technical Strengths")
    story.append(
        Paragraph(
            "<b>Methods:</b> Molecular dynamics, discrete dislocation dynamics, multiscale mechanics, defect analysis, fracture and plasticity, microstructure-sensitive modeling<br/>"
            "<b>Software:</b> LAMMPS, OpenDiS/ExaDiS workflows, OVITO, Neper, ParaView, Git, Linux/Unix, HPC schedulers<br/>"
            "<b>Programming:</b> Python, NumPy, Pandas, scientific visualization, workflow automation, C/C++, Fortran",
            st["body"],
        )
    )
    story += section(st, "Professional Experience")
    story += role(
        st,
        "Visiting Researcher, Computational Materials Science",
        "Merrimack College, North Andover, Massachusetts, USA",
        "Apr 2026 - Jul 31, 2026",
        [
            "Conducted multiscale MD and DDD research on crack-tip plasticity, defect evolution and ductile-to-brittle transition behavior in tungsten and tungsten-rhenium alloys.",
            "Developed automated LAMMPS and HPC workflows for temperature-dependent fracture simulations and large-scale post-processing.",
            "Connected atomistic fracture observations with mesoscale dislocation-network evolution for a forthcoming multiscale tungsten study.",
            "Collaborated on technical reports and research proposals and mentored students in computational mechanics and parallel molecular dynamics.",
        ],
    )
    story += role(
        st,
        "Junior Research Fellow, DRDO Project",
        "Indian Institute of Technology Bombay, Mumbai, India",
        "Jan 2025 - Dec 2025",
        [
            "Investigated constitutive behavior and high-strain-rate response of shape-memory-alloy-based composites for aerospace and defense applications.",
            "Combined Split Hopkinson Pressure Bar experiments with numerical simulations for constitutive-model calibration and validation.",
            "Supported project execution, data analysis and mentoring in experimental characterization and computational mechanics.",
        ],
    )
    story += role(
        st,
        "Ph.D. Research Scholar",
        "Indian Institute of Technology Bombay, Mumbai, India",
        "Jan 2019 - Jun 2025",
        [
            "Developed molecular dynamics and discrete dislocation dynamics models for defect mobility, precipitate strengthening and prior-particle-boundary effects in nickel-based superalloys.",
            "Built physics-informed workflows linking atomistic parameters with mesoscale dislocation mechanics using LAMMPS, Python and HPC systems.",
        ],
    )
    story += role(
        st,
        "Graduate Teaching Assistant",
        "Indian Institute of Technology Bombay, Mumbai, India",
        "Jan 2019 - Dec 2023",
        ["Supported courses and computational laboratories in continuum mechanics, finite element methods and multiscale modeling."],
    )
    story += role(
        st,
        "Assistant Professor, Mechanical Engineering",
        "CMR Institute of Technology, Bengaluru, India",
        "Jun 2016 - Dec 2018",
        ["Taught finite element methods, experimental stress analysis and solid mechanics, with computational modules using ANSYS, MATLAB and Python."],
    )
    story += section(st, "Education")
    story += role(
        st,
        "Ph.D., Aerospace Engineering",
        "Indian Institute of Technology Bombay",
        "2019 - 2025",
        ["Thesis: Multiscale Modeling of Prior Particle Boundaries in Nickel-based Superalloys."],
    )
    story += role(
        st,
        "M.Tech., Mechanical Engineering - Mechanical Systems Design",
        "Indian Institute of Technology Kharagpur",
        "2014 - 2016",
    )
    story += role(
        st,
        "B.E., Aeronautical Engineering",
        "The Aeronautical Society of India",
        "2010 - 2013",
    )
    story += section(st, "Selected Publications and Software")
    story.append(
        publication(
            st,
            "A Discrete Dislocation Dynamics Study of Prior Particle Boundary Effects in Ni-based Superalloys",
            "Divyesh A. Mistry, Tawqeer Nasir Tak, R. Sankarasubramanian and P. J. Guruprasad",
            "Journal of Engineering Materials and Technology, published online 2026. DOI: 10.1115/1.4072448",
            "https://doi.org/10.1115/1.4072448",
        )
    )
    story.append(
        publication(
            st,
            "Size-dependent Power Laws for Edge Dislocations in Nickel Superalloys: A Molecular Dynamics Study",
            "Divyesh A. Mistry and Amuthan A. Ramabathiran",
            "Computational Materials Science 259 (2025), 114122. DOI: 10.1016/j.commatsci.2025.114122",
            "https://doi.org/10.1016/j.commatsci.2025.114122",
        )
    )
    story.append(
        publication(
            st,
            "Multiscale fracture and collective dislocation evolution in tungsten-based materials",
            "Divyesh A. Mistry and collaborators",
            "Journal manuscript in preparation.",
        )
    )
    story.append(
        publication(
            st,
            "Polycrystalline Tungsten Discrete Dislocation Dynamics Workflow",
            "Dr. Divyesh A. Mistry",
            "Open-source modular Python workflow with a reproducible 15-grain example, tests and citation metadata.",
            "https://github.com/divyesh-mistry/ddd-w-poly",
        )
    )
    story += section(st, "Selected Recognition")
    story += bullets(
        st,
        [
            "Institution of Eminence travel support for TMS 2025, USA.",
            "IIT Bombay travel grant for COMPLAS 2023, Barcelona, Spain.",
            "MHRD Teaching Assistantship through research project, IIT Bombay.",
            "Graduate Aptitude Test in Engineering (GATE) 2014: All India Rank 69.",
            "Member, The Minerals, Metals & Materials Society; permanent associate member, Aeronautical Society of India.",
        ],
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def build_academic_cv(path):
    st = styles()
    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        leftMargin=0.58 * inch,
        rightMargin=0.58 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.56 * inch,
        title="Dr. Divyesh A. Mistry - Academic Curriculum Vitae",
        author="Dr. Divyesh A. Mistry",
    )
    story = header(st, "Academic Curriculum Vitae | Computational Materials Science and Multiscale Mechanics")
    story += section(st, "Research Profile")
    story.append(
        Paragraph(
            "Research focuses on mechanistic multiscale descriptions of plasticity, dislocation evolution and fracture in advanced structural materials. Current and recent work combines atomistic simulation, discrete dislocation dynamics, continuum mechanics and microstructure generation to study nickel-based superalloys and refractory tungsten alloys.",
            st["body"],
        )
    )
    story += section(st, "Appointments")
    story += role(
        st,
        "Visiting Researcher, Computational Materials Science",
        "Merrimack College, North Andover, MA, USA",
        "Apr 2026 - Jul 31, 2026",
        [
            "Investigated temperature-dependent crack-tip instability and dislocation-mediated relaxation in tungsten and tungsten-rhenium alloys using MD and DDD.",
            "Developed reproducible LAMMPS, Python and polycrystalline DDD workflows for high-performance computing environments.",
            "Contributed to technical reports, research proposals and student mentoring.",
        ],
    )
    story += role(st, "Junior Research Fellow, DRDO Project", "Indian Institute of Technology Bombay", "Jan 2025 - Dec 2025", ["Investigated constitutive behavior and high-strain-rate response of shape-memory-alloy-based composites using impact experiments and numerical simulation."])
    story += role(st, "Ph.D. Research Scholar", "Indian Institute of Technology Bombay", "Jan 2019 - Jun 2025", ["Developed atomistic and mesoscale models of dislocation-mediated deformation in nickel-based superalloys."])
    story += role(st, "Graduate Teaching Assistant", "Indian Institute of Technology Bombay", "Jan 2019 - Dec 2023")
    story += role(st, "Assistant Professor, Mechanical Engineering", "CMR Institute of Technology, Bengaluru, India", "Jun 2016 - Dec 2018")
    story += role(st, "Graduate Teaching Assistant and M.Tech. Researcher", "Indian Institute of Technology Kharagpur", "Jun 2014 - Jul 2016")
    story += section(st, "Education")
    story += role(st, "Ph.D., Aerospace Engineering", "Indian Institute of Technology Bombay", "2019 - 2025", ["Thesis: Multiscale Modeling of Prior Particle Boundaries in Nickel-based Superalloys."])
    story += role(st, "M.Tech., Mechanical Engineering - Mechanical Systems Design", "Indian Institute of Technology Kharagpur", "2014 - 2016")
    story += role(st, "B.E., Aeronautical Engineering", "The Aeronautical Society of India", "2010 - 2013")
    story += section(st, "Journal Articles")
    story.append(publication(st, "A Discrete Dislocation Dynamics Study of Prior Particle Boundary Effects in Ni-based Superalloys", "Divyesh A. Mistry, Tawqeer Nasir Tak, R. Sankarasubramanian and P. J. Guruprasad", "Journal of Engineering Materials and Technology, published online 2026. DOI: 10.1115/1.4072448", "https://doi.org/10.1115/1.4072448"))
    story.append(publication(st, "Size-dependent Power Laws for Edge Dislocations in Nickel Superalloys: A Molecular Dynamics Study", "Divyesh A. Mistry and Amuthan A. Ramabathiran", "Computational Materials Science 259 (2025), 114122. DOI: 10.1016/j.commatsci.2025.114122", "https://doi.org/10.1016/j.commatsci.2025.114122"))
    story += section(st, "Manuscripts and Open Research Software")
    story.append(publication(st, "Multiscale fracture and collective dislocation evolution in tungsten-based materials", "Divyesh A. Mistry and collaborators", "Journal manuscript in preparation."))
    story.append(publication(st, "Polycrystalline Tungsten Discrete Dislocation Dynamics Workflow", "Dr. Divyesh A. Mistry", "Open-source modular Python workflow with examples, tests and citation metadata.", "https://github.com/divyesh-mistry/ddd-w-poly"))
    story += section(st, "Selected Conference Contributions")
    story += bullets(st, [
        "Multiscale Modeling of Dislocation-Precipitate-PPB Interactions in Powder-Metallurgy Nickel Superalloys, Engineering Mechanics Institute Conference, Boulder, Colorado, USA, 2026.",
        "Hierarchical Multiscale Modeling of Plasticity in Ni-Based Superalloys, IMPLAST 2025, IIT Roorkee, India.",
        "An Atomistically Informed Discrete Dislocation Dynamics Study of Prior Particle Boundaries in Ni-Based Superalloys, COMPLAS 2023, Barcelona, Spain.",
    ])
    story += section(st, "Research Methods and Software")
    story.append(Paragraph("<b>Simulation:</b> Molecular dynamics; discrete dislocation dynamics; microstructure-sensitive and multiscale mechanics; fracture, plasticity and defect evolution.", st["body"]))
    story.append(Paragraph("<b>Tools:</b> LAMMPS, OVITO/DXA, Neper, OpenDiS/ExaDiS workflows, ParaView, Git, Linux/Unix and HPC scheduling environments.", st["body"]))
    story.append(Paragraph("<b>Programming and analysis:</b> Python, NumPy, Pandas, scientific visualization, workflow automation, C/C++ and Fortran.", st["body"]))
    story += section(st, "Teaching and Mentoring")
    story += bullets(st, [
        "Teaching and laboratory support in computational mechanics, continuum mechanics, material behavior and engineering simulation.",
        "Mentoring of graduate and undergraduate students in molecular dynamics setup, parallel computation and scientific post-processing.",
        "Development of reproducible examples and documentation for open-source DDD research software.",
    ])
    story += section(st, "Awards and Professional Memberships")
    story += bullets(st, [
        "Member, The Minerals, Metals & Materials Society, 2025.",
        "Institution of Eminence travel support, IIT Bombay, for TMS 2025, USA.",
        "IIT Bombay travel grant for COMPLAS 2023, Spain.",
        "MHRD Teaching Assistantship through research project, IIT Bombay, 2019.",
        "Graduate Aptitude Test in Engineering (GATE) 2014: All India Rank 69.",
        "Permanent associate member, Aeronautical Society of India, 2013.",
    ])
    story += section(st, "Selected Certifications")
    story += bullets(st, [
        "Using Python for Research, HarvardX, 2020.",
        "The Unix Workbench, Johns Hopkins University, 2020.",
        "Material Behavior, Georgia Institute of Technology, 2020.",
        "A Hands-on Introduction to Engineering Simulations, CornellX, 2018.",
    ])
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    build_resume(OUT / "Divyesh_Mistry_Professional_Resume.pdf")
    build_academic_cv(OUT / "Divyesh_Mistry_Academic_CV.pdf")
