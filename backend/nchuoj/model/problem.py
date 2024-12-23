from model.base import Base

from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    Boolean,
    ForeignKey,
)


__all__ = ["Problem", ]


class Problem(Base):
    __tablename__ = "problem"

    problemid = Column(Integer, primary_key=True, autoincrement=True)
    homeworkid = Column(Integer, ForeignKey("homework.homeworkid"), nullable=False)
    score = Column(Integer, nullable=False)
    memory_limit = Column(Float, nullable=False, server_default="256.0")   # kb
    runtime_limit = Column(Float, nullable=False, server_default="1.0")    # s
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    tag = Column(String, nullable=True)

    # auth
    is_show = Column(Boolean, nullable=False, server_default="true")


    def to_dict(self):
        return {
            "problemid": self.problemid,
            "homeworkid": self.homeworkid,
            "score": self.score,
            "memory_limit": self.memory_limit,
            "runtime_limit": self.runtime_limit,
            "name": self.name,
            "description": self.description,
            "tag": self.tag,
            "is_show": self.is_show
        }
